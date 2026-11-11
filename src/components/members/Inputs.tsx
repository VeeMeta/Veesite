"use client";

import { useEffect, useRef } from "react";

export function AutoTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [props.value]);
  return <textarea ref={ref} {...props} className={`m-input m-textarea ${props.className || ""}`} />;
}

export function Choice({
  name,
  options,
  value,
  onChange,
  legend,
  hideLegend,
  small,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  legend: string;
  hideLegend?: boolean;
  small?: boolean;
}) {
  return (
    <fieldset className={`m-choice ${small ? "is-small" : ""}`}>
      <legend className={hideLegend ? "sr-only" : "m-choice-legend"}>{legend}</legend>
      <div className="m-pills">
        {options.map((o) => (
          <label key={o} className={`m-pill ${value === o ? "is-on" : ""}`} data-opt={o}>
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              onClick={() => value === o && onChange("")}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
