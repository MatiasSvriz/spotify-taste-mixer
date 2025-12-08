"use client";

export default function DecadeWidget({ selectedItems = [], onSelect }) {
  const decades = [
    "1950", "1960", "1970", "1980",
    "1990", "2000", "2010", "2020"
  ];

  function toggle(decade) {
    const exists = selectedItems.includes(decade);

    if (exists) {
      onSelect(selectedItems.filter(d => d !== decade));
    } else {
      onSelect([...selectedItems, decade]);
    }
  }

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-4">
      
      <h2 className="text-lg font-semibold">Décadas</h2>

      <div className="grid grid-cols-2 gap-2">
        {decades.map(decade => (
          <button
            key={decade}
            onClick={() => toggle(decade)}
            className={`
              px-3 py-2 rounded border text-sm
              ${selectedItems.includes(decade)
                ? "bg-green-600 border-green-500"
                : "bg-zinc-800 border-zinc-700"}
            `}
          >
            {decade}s
          </button>
        ))}
      </div>

      {/* Mostrar seleccionados */}
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((d) => (
          <span
            key={d}
            onClick={() => toggle(d)}
            className="px-3 py-1 bg-green-600 rounded cursor-pointer text-sm"
          >
            {d}s ✕
          </span>
        ))}
      </div>

    </div>
  );
}
