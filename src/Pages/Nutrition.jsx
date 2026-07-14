import { useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";


export default function Nutrition() {


  const [mealType, setMealType] = useState("Breakfast");

  const [meal, setMeal] = useState("");

  const [calories, setCalories] = useState("");

  const [water, setWater] = useState(0);


  const [meals, setMeals] = useState([]);



  function addMeal(){

    if(!meal){
      alert("Enter your meal");
      return;
    }


    const newMeal = {

      type: mealType,

      food: meal,

      calories: calories || 0,

    };


    setMeals([
      ...meals,
      newMeal
    ]);


    setMeal("");

    setCalories("");

  }




  const totalCalories = meals.reduce(

    (sum,item)=>
      sum + Number(item.calories),

    0

  );



  return (

    <AuthenticatedLayout>


      <div className="max-w-5xl mx-auto space-y-8">



        <div>

          <h1 className="text-3xl font-bold text-pink-600">
            🥗 Nutrition Tracker
          </h1>


          <p className="text-gray-500 mt-2">
            Track your meals and maintain a healthy lifestyle.
          </p>


        </div>





        {/* Add Meal */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            Add Today's Meal
          </h2>



          <select

            className="w-full p-3 border rounded-xl mb-4"

            value={mealType}

            onChange={(e)=>
              setMealType(e.target.value)
            }

          >

            <option>
              Breakfast
            </option>

            <option>
              Lunch
            </option>

            <option>
              Dinner
            </option>

            <option>
              Snack
            </option>


          </select>




          <input

            className="w-full p-3 border rounded-xl mb-4"

            placeholder="Example: Oatmeal, Rice, Salad"

            value={meal}

            onChange={(e)=>
              setMeal(e.target.value)
            }

          />




          <input

            type="number"

            className="w-full p-3 border rounded-xl mb-4"

            placeholder="Calories"

            value={calories}

            onChange={(e)=>
              setCalories(e.target.value)
            }

          />




          <button

            onClick={addMeal}

            className="
            w-full
            bg-pink-500
            text-white
            p-3
            rounded-xl
            hover:bg-pink-600
            "

          >

            Add Meal 🍽️

          </button>



        </div>







        {/* Water */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold">
            💧 Water Intake
          </h2>


          <p className="text-gray-500 mt-2">
            Glasses consumed today
          </p>



          <div className="flex items-center gap-5 mt-5">


            <button

              onClick={()=>
                setWater(Math.max(0,water-1))
              }

              className="px-5 py-2 bg-gray-200 rounded-xl"

            >
              -
            </button>



            <span className="text-3xl font-bold text-pink-600">

              {water}

            </span>




            <button

              onClick={()=>
                setWater(water+1)
              }

              className="px-5 py-2 bg-pink-500 text-white rounded-xl"

            >

              +

            </button>


          </div>


        </div>








        {/* Summary */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            📊 Today's Summary
          </h2>



          <p>
            <b>Total Calories:</b> {totalCalories} kcal
          </p>


          <p className="mt-2">
            <b>Water:</b> {water} glasses
          </p>



        </div>







        {/* Meal History */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            🍴 Today's Meals
          </h2>




          {

          meals.length===0 ?

          (

            <p className="text-gray-500">
              No meals added yet.
            </p>

          )

          :

          (

            <div className="space-y-3">


              {
                meals.map((item,index)=>(

                  <div

                    key={index}

                    className="
                    border
                    rounded-xl
                    p-4
                    "

                  >

                    <p className="font-semibold">
                      {item.type}
                    </p>


                    <p>
                      {item.food}
                    </p>


                    <p className="text-gray-500 text-sm">
                      {item.calories} kcal
                    </p>


                  </div>

                ))
              }


            </div>

          )


          }


        </div>



      </div>


    </AuthenticatedLayout>

  );
}