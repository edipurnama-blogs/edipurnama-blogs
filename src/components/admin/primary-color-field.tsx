"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function PrimaryColorField({
  defaultColor,
  history,
}: {
  defaultColor: string;
  history: string[];
}) {
  const [color, setColor] = useState(defaultColor);
  const colorHistory = Array.from(new Set([color, ...history])).filter((item) => /^#[0-9a-f]{6}$/i.test(item));

  return (
    <div className="space-y-2">
      <Label htmlFor="primary_color">Primary color</Label>
      <div className="flex items-center gap-3">
        <Input
          id="primary_color"
          name="primary_color"
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-11 w-16 shrink-0 px-2"
        />
        <Input
          value={color}
          readOnly
          className="font-mono uppercase"
          aria-label="Kode warna primary"
        />
      </div>
      {colorHistory.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {colorHistory.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "inline-flex size-7 rounded-full border border-border shadow-sm ring-offset-background transition hover:ring-2 hover:ring-slate-300",
                item.toLowerCase() === color.toLowerCase() && "ring-2 ring-primary",
              )}
              style={{ backgroundColor: item }}
              title={item}
              aria-label={`Gunakan warna ${item}`}
              onClick={() => setColor(item)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
