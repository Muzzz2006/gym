import React, { useState } from "react";
import { Activity, Percent, Flame, Scale, Calculator } from "lucide-react";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState<number>(175); // cm or inches
  const [weight, setWeight] = useState<number>(75);  // kg or lbs
  const [age, setAge] = useState<number>(28);
  const [activity, setActivity] = useState<number>(1.55); // moderate activity factor

  // Computed results states
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const [idealWeight, setIdealWeight] = useState<string>("");
  const [calories, setCalories] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !age) return;

    let computedBmi = 0;
    let idealMin = 0;
    let idealMax = 0;
    let bmr = 0;

    if (unit === "metric") {
      // Metric calculations
      const heightInMeters = height / 100;
      computedBmi = weight / (heightInMeters * heightInMeters);
      idealMin = 18.5 * (heightInMeters * heightInMeters);
      idealMax = 24.9 * (heightInMeters * heightInMeters);

      // Harris-Benedict BMR Formula
      if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);
      }
    } else {
      // Imperial calculations
      computedBmi = (weight / (height * height)) * 703;
      idealMin = (18.5 * (height * height)) / 703;
      idealMax = (24.9 * (height * height)) / 703;

      // Convert imperial to metric for BMR equation
      const weightKg = weight * 0.453592;
      const heightCm = height * 2.54;
      if (gender === "male") {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.33 * age);
      }
    }

    // Determine Status
    let bmiStatus = "";
    if (computedBmi < 18.5) bmiStatus = "Underweight (Increase calorie ceiling)";
    else if (computedBmi >= 18.5 && computedBmi < 25) bmiStatus = "Healthy Weight (Maintain athletic protocol)";
    else if (computedBmi >= 25 && computedBmi < 30) bmiStatus = "Overweight (Cardio & calorie restriction)";
    else bmiStatus = "Obese (High intensity coaching recommended)";

    setBmi(parseFloat(computedBmi.toFixed(1)));
    setStatus(bmiStatus);
    setIdealWeight(
      `${idealMin.toFixed(1)} - ${idealMax.toFixed(1)} ${unit === "metric" ? "kg" : "lbs"}`
    );
    setCalories(Math.round(bmr * activity));
  };

  return (
    <section id="bmi" className="py-24 bg-gym-dark relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-gym-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text/Intro details */}
          <div className="space-y-6 text-left">
            <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold">PHYSIOLOGICAL AUDIT</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
              BODY COMPOSITION CALCULATOR
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Use our scientific baseline index audit to compute your Body Mass Index (BMI) and discover your Daily Target Energy Expenditure (DTEE). This serves as the blueprint for training design.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-start space-x-3 text-xs text-gray-300">
                <Activity className="w-5 h-5 text-gym-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-white block">Precision Energy Formula</span>
                  BMR is estimated using the modern Harris-Benedict formulas with customized metabolic activity scaling.
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs text-gray-300">
                <Percent className="w-5 h-5 text-gym-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-white block">Metabolic Allocation</span>
                  Provides essential baseline macro thresholds to determine active daily metabolic burn capacities.
                </div>
              </div>
            </div>
          </div>

          {/* Form & Calculations Grid */}
          <div className="rounded-2xl glass-panel p-6 border border-white/5 flex flex-col md:flex-row gap-6 relative">
            
            {/* Input fields */}
            <form onSubmit={calculate} className="w-full md:w-1/2 space-y-4 text-left">
              {/* Unit Toggle */}
              <div className="flex rounded-xl bg-white/5 p-1 border border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setUnit("metric");
                    setBmi(null);
                    setHeight(175);
                    setWeight(75);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    unit === "metric" ? "bg-gym-gold text-gym-dark" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Metric (cm/kg)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUnit("imperial");
                    setBmi(null);
                    setHeight(68);
                    setWeight(160);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    unit === "imperial" ? "bg-gym-gold text-gym-dark" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Imperial (in/lb)
                </button>
              </div>

              {/* Gender selector */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    gender === "male"
                      ? "bg-white/10 border-gym-gold text-white"
                      : "bg-white/5 border-transparent text-gray-400"
                  }`}
                >
                  ♂️ Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    gender === "female"
                      ? "bg-white/10 border-gym-gold text-white"
                      : "bg-white/5 border-transparent text-gray-400"
                  }`}
                >
                  ♀️ Female
                </button>
              </div>

              {/* Numerical Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Height ({unit === "metric" ? "cm" : "inches"})
                  </label>
                  <input
                    type="number"
                    required
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-gym-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Weight ({unit === "metric" ? "kg" : "lbs"})
                  </label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-gym-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-gym-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Daily Activity
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                  >
                    <option value={1.2}>Sedentary (Office Work)</option>
                    <option value={1.375}>Light Active (1-2 days/wk)</option>
                    <option value={1.55}>Moderately Active (3-5 days/wk)</option>
                    <option value={1.725}>Highly Active (6-7 days/wk)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gym-gold hover:bg-gym-gold/90 text-gym-dark font-semibold rounded-xl text-xs tracking-wider uppercase transition-all shadow-md shadow-gym-gold/10 hover:shadow-gym-gold/25 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Compute Composition</span>
              </button>
            </form>

            {/* Calculations Result Output */}
            <div className="w-full md:w-1/2 flex flex-col justify-center bg-white/5 p-5 rounded-xl border border-white/5">
              {bmi !== null ? (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-semibold text-gym-gold uppercase tracking-widest">Calculated BMI</span>
                    <p className="text-5xl font-display font-black text-white">{bmi}</p>
                    <p className="text-[11px] font-medium text-gym-gold uppercase tracking-wide">{status}</p>
                  </div>

                  <div className="space-y-3.5 pt-4 border-t border-white/5 text-xs">
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="text-gray-400 flex items-center space-x-1">
                        <Scale className="w-3.5 h-3.5 text-gym-gold" />
                        <span>Ideal Target Weight</span>
                      </span>
                      <span className="font-mono text-white font-bold">{idealWeight}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-300">
                      <span className="text-gray-400 flex items-center space-x-1">
                        <Flame className="w-3.5 h-3.5 text-gym-gold" />
                        <span>Daily Energy (DTEE)</span>
                      </span>
                      <span className="font-mono text-white font-bold">{calories} kcal</span>
                    </div>

                    <div className="p-3 rounded-lg bg-gym-gold/5 border border-gym-gold/10 text-[10px] leading-relaxed text-gray-400">
                      <span className="font-bold text-gym-gold block uppercase mb-0.5">Energy Target Directives</span>
                      To trigger <span className="text-white font-semibold">Hypertrophy (Gain muscle)</span>, hit {calories + 300} kcal/day. To trigger <span className="text-white font-semibold">Lipolysis (Fat loss)</span>, restrict to {calories - 500} kcal/day.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Calculator className="w-12 h-12 text-gray-600 mx-auto animate-pulse" />
                  <h5 className="text-sm font-semibold text-white">Baseline Diagnostics Pending</h5>
                  <p className="text-[11px] text-gray-400 max-w-[200px] mx-auto leading-relaxed">
                    Input your structural variables and hit compute to receive composition results.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
