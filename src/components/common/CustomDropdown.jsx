"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  icon: Icon,
  placeholder = "Select Option",
  className = "",
  buttonClassName = "",
  menuClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.id === value || opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2.5 rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/80 hover:bg-black/80 active:scale-95 cursor-pointer ${
          isOpen ? "border-primary shadow-[0_0_20px_rgba(255,59,48,0.35)]" : ""
        } ${buttonClassName}`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-3.5 w-3.5 text-primary shrink-0" />}
          <span className="truncate">
            {selectedOption ? selectedOption.name || selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/60 transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-white/15 bg-[#0f0f10]/95 p-1.5 shadow-[0_15px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl ${menuClassName}`}
          >
            <div className="max-h-60 overflow-y-auto scrollbar-none space-y-1">
              {options.map((option) => {
                const optVal = option.id !== undefined ? option.id : option.value;
                const isSelected = optVal === value;

                return (
                  <button
                    key={optVal}
                    type="button"
                    onClick={() => {
                      onChange(optVal);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {option.flag && <span>{option.flag}</span>}
                      {option.icon && <option.icon className="h-3.5 w-3.5 shrink-0" />}
                      <span className="truncate">{option.name || option.label}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
