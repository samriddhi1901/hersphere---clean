import { useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";

export default function CycleTracker() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  const [result, setResult] = useState(null);

  function calculateCycle() {
    if (!lastPeriod) return;

    const startDate = new Date(lastPeriod);

    const nextPeriod = new Date(startDate);
    nextPeriod.setDate(startDate.getDate() + cycleLength);

    const ovulationDay = new Date(startDate);
    ovulationDay.setDate(startDate.getDate() + cycleLength - 14);

    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 3);

    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(ovulationDay.getDate() + 3);

    const today = new Date();
    const cycleDay =
      Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

    setResult({
      nextPeriod: nextPeriod.toDateString(),
      ovulation: ovulationDay.toDateString(),
      fertileStart: fertileStart.toDateString(),
      fertileEnd: fertileEnd.toDateString(),
      cycleDay,
    });
  }

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          🌸 Cycle Tracker
        </h1>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Last Period Date</label>

            <input
              type="date"
              className="w-full p-3 border rounded-xl"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Cycle Length (days)
            </label>

            <input
              type="number"
              className="w-full p-3 border rounded-xl"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
            />
          </div>

          <button
            onClick={calculateCycle}
            className="w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600"
          >
            Calculate Cycle
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-3">
            <p>
              <b>Cycle Day:</b> {result.cycleDay}
            </p>
            <p>
              <b>Next Period:</b> {result.nextPeriod}
            </p>
            <p>
              <b>Ovulation:</b> {result.ovulation}
            </p>
            <p>
              <b>Fertile Window:</b> {result.fertileStart} → {result.fertileEnd}
            </p>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
