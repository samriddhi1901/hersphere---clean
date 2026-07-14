import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";


export default function MoodTracker() {

  const moods = [
    {
      name: "Happy",
      emoji: "😊"
    },
    {
      name: "Calm",
      emoji: "😌"
    },
    {
      name: "Sad",
      emoji: "😔"
    },
    {
      name: "Angry",
      emoji: "😡"
    },
    {
      name: "Tired",
      emoji: "😴"
    },
    {
      name: "Stressed",
      emoji: "😰"
    }
  ];


  const [selectedMood, setSelectedMood] = useState("");

  const [note, setNote] = useState("");

  const [history, setHistory] = useState([]);



  const user_id = localStorage.getItem("user_id");



  // Save mood

  const saveMood = async () => {

    if (!selectedMood) {
      alert("Please select your mood");
      return;
    }


    try {

      await API.post("/mood", {

        user_id: user_id,

        mood: selectedMood,

        note: note

      });


      alert("Mood saved successfully 💗");


      setSelectedMood("");

      setNote("");


      fetchMoodHistory();


    }
    catch(error){

      console.log(
        "Mood save error:",
        error
      );

    }

  };



  // Fetch mood history

  const fetchMoodHistory = async () => {

    try {

      const response =
        await API.get(`/mood/${user_id}`);


      setHistory(response.data);


    }
    catch(error){

      console.log(
        "History error:",
        error
      );

    }

  };



  useEffect(() => {

    if(user_id){

      fetchMoodHistory();

    }

  }, []);




  return (

    <AuthenticatedLayout>


      <div className="max-w-4xl mx-auto space-y-8">


        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-pink-600">
            🌸 Mood Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            Track how you feel every day and understand your emotional patterns.
          </p>

        </div>



        {/* Mood Selection */}

        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            How are you feeling today?
          </h2>



          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">


            {moods.map((item)=> (

              <button

                key={item.name}

                onClick={() =>
                  setSelectedMood(item.name)
                }


                className={`
                  p-4 rounded-2xl border
                  transition
                  ${
                    selectedMood === item.name
                    ?
                    "bg-pink-100 border-pink-500"
                    :
                    "hover:bg-pink-50"
                  }
                `}

              >

                <div className="text-3xl">
                  {item.emoji}
                </div>

                <p className="mt-2 text-sm">
                  {item.name}
                </p>


              </button>

            ))}


          </div>




          {/* Note */}

          <textarea

            className="
            w-full mt-6 p-4
            border rounded-2xl
            focus:outline-pink-400
            "

            placeholder="Write a small note about your day..."
            
            value={note}

            onChange={(e)=>
              setNote(e.target.value)
            }

          />



          <button

            onClick={saveMood}

            className="
            mt-5 w-full
            bg-pink-500
            text-white
            p-3
            rounded-xl
            hover:bg-pink-600
            "

          >

            Save Mood 💗

          </button>


        </div>





        {/* History */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            Your Mood History
          </h2>



          {
            history.length === 0 ?

            (

              <p className="text-gray-500">
                No mood entries yet.
              </p>

            )

            :

            (

              <div className="space-y-4">


              {
                history.map((item,index)=>(

                  <div

                    key={index}

                    className="
                    border
                    rounded-2xl
                    p-4
                    flex
                    justify-between
                    items-center
                    "

                  >


                    <div>

                      <p className="font-semibold">

                        {item.mood}

                      </p>


                      <p className="text-gray-500 text-sm">

                        {item.note || "No note"}

                      </p>


                    </div>



                    <p className="text-sm text-gray-400">

                      {item.created_at.split(" ")[0]}

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