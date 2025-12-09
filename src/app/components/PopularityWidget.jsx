"use client";

export default function PopularityWidget({ selectedItems = [50, 100], onSelect }) {
  const options = [
    { label: "Underground", range: [0, 50] },
    { label: "Popular", range: [50, 80] },
    { label: "Mainstream", range: [80, 100] }
  ];

  function select(range) {
    onSelect(range);
  }

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-3">
      <h2 className="text-lg font-semibold">Popularidad</h2>

      <div className="space-y-2">
        {options.map((opt) => {
          const min = opt.range[0];
          const max = opt.range[1];

          const isSelected =
            selectedItems[0] === min && selectedItems[1] === max;

          return (
            <button
              key={opt.label}
              onClick={() => select(opt.range)}
              className={`
                w-full text-left px-3 py-2 rounded border text-sm
                ${isSelected ? "bg-green-600 border-green-500" : "bg-zinc-800 border-zinc-700"}
              `}
            >
              {opt.label} ({min} a {max})
            </button>
          );
        })}
      </div>
    </div>
  );
}
