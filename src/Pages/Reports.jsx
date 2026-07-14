import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";


export default function Reports() {

  const [moods, setMoods] = useState([]);

  const [cycles, setCycles] = useState([]);


  const user_id = localStorage.getItem("user_id");



  const fetchReports = async () => {

    try {

      const moodResponse =
        await API.get(`/mood/${user_id}`);


      const cycleResponse =
        await API.get(`/cycle/${user_id}`);


      setMoods(moodResponse.data);

      setCycles(cycleResponse.data);


    }
    catch(error){

      console.log(
        "Report error:",
        error
      );

    }

  };



  useEffect(()=>{

    if(user_id){
      fetchReports();
    }

  },[]);




  const latestMood =
    moods.length > 0
    ?
    moods[moods.length-1]
    :
    null;



  const latestCycle =
    cycles.length > 0
    ?
    cycles[cycles.length-1]
    :
    null;



  return (

    <AuthenticatedLayout>


      <div className="max-w-5xl mx-auto space-y-8">



        <div>

          <h1 className="text-3xl font-bold text-pink-600">
            📊 Health Reports
          </h1>

          <p className="text-gray-500 mt-2">
            Your wellness summary based on mood and cycle tracking.
          </p>

        </div>




        {/* Summary Cards */}


        <div className="grid md:grid-cols-3 gap-6">


          <div className="bg-white rounded-3xl shadow p-6">

            <h3 className="text-gray-500">
              Total Mood Entries
            </h3>

            <p className="text-3xl font-bold text-pink-600 mt-2">

              {moods.length}

            </p>

          </div>



          <div className="bg-white rounded-3xl shadow p-6">

            <h3 className="text-gray-500">
              Latest Mood
            </h3>


            <p className="text-2xl font-bold mt-2">

              {
                latestMood
                ?
                latestMood.mood
                :
                "No data"
              }

            </p>


          </div>




          <div className="bg-white rounded-3xl shadow p-6">

            <h3 className="text-gray-500">
              Cycle Length
            </h3>


            <p className="text-3xl font-bold text-pink-600 mt-2">

              {
                latestCycle
                ?
                `${latestCycle.cycle_length} days`
                :
                "No data"
              }

            </p>


          </div>


        </div>






        {/* Cycle Report */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            🌸 Cycle Summary
          </h2>



          {
            latestCycle ?

            (

              <div className="space-y-3">

                <p>
                  <b>Last Period:</b>{" "}
                  {latestCycle.start_date}
                </p>


                <p>
                  <b>Next Expected Period:</b>{" "}
                  {latestCycle.next_period}
                </p>


                <p>
                  <b>Cycle Length:</b>{" "}
                  {latestCycle.cycle_length} days
                </p>


              </div>

            )

            :

            (

              <p className="text-gray-500">
                No cycle data available.
              </p>

            )

          }


        </div>







        {/* Mood History */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-xl font-semibold mb-5">
            😊 Mood History
          </h2>



          {
            moods.length === 0 ?

            (

              <p className="text-gray-500">
                Start tracking your mood to see reports.
              </p>

            )

            :

            (

              <div className="space-y-4">


                {
                  moods.slice().reverse().map((item,index)=>(


                    <div

                      key={index}

                      className="
                      border
                      rounded-2xl
                      p-4
                      "

                    >


                      <p className="font-semibold">

                        {item.mood}

                      </p>


                      <p className="text-gray-500 text-sm">

                        {item.note || "No note"}

                      </p>


                      <p className="text-xs text-gray-400 mt-2">

                        {item.created_at}

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