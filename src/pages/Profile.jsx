import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";


export default function Profile() {

  const { user } = useUser();


  return (

    <AuthenticatedLayout>

      <div className="max-w-5xl mx-auto space-y-6">


        {/* Profile Header */}

        <div className="bg-white rounded-3xl shadow p-8 flex flex-col md:flex-row items-center gap-6">


          <img
            src={user?.imageUrl}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-pink-200"
          />


          <div>

            <h1 className="text-3xl font-bold text-pink-600">
              {user?.fullName || "HerSphere User"} 🌸
            </h1>


            <p className="text-gray-600 mt-2">
              {user?.primaryEmailAddress?.emailAddress}
            </p>


            <p className="text-sm text-gray-500 mt-2">
              Member since{" "}
              {new Date(user?.createdAt).toDateString()}
            </p>


          </div>


        </div>



        {/* Wellness Summary */}


        <div className="grid md:grid-cols-3 gap-6">


          <div className="bg-pink-50 p-6 rounded-3xl">

            <h2 className="font-semibold text-pink-600">
              🌙 Cycle Tracking
            </h2>

            <p className="text-gray-600 mt-2">
              Monitor your cycle and understand your body better.
            </p>

          </div>



          <div className="bg-purple-50 p-6 rounded-3xl">

            <h2 className="font-semibold text-purple-600">
              💭 Mood Tracking
            </h2>

            <p className="text-gray-600 mt-2">
              Keep track of your emotions and mental wellness.
            </p>

          </div>




          <div className="bg-green-50 p-6 rounded-3xl">

            <h2 className="font-semibold text-green-600">
              🥗 Nutrition
            </h2>

            <p className="text-gray-600 mt-2">
              Maintain healthy eating habits.
            </p>

          </div>


        </div>




        {/* Quick Actions */}


        <div className="bg-white rounded-3xl shadow p-8">


          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Explore HerSphere ✨
          </h2>


          <div className="grid md:grid-cols-2 gap-4">


            <Link
              to="/cycle"
              className="p-4 rounded-xl bg-pink-100 hover:bg-pink-200"
            >
              🌸 Cycle Tracker
            </Link>



            <Link
              to="/mood"
              className="p-4 rounded-xl bg-purple-100 hover:bg-purple-200"
            >
              💜 Mood Tracker
            </Link>



            <Link
              to="/nutrition"
              className="p-4 rounded-xl bg-green-100 hover:bg-green-200"
            >
              🥗 Nutrition Tracker
            </Link>



            <Link
              to="/reports"
              className="p-4 rounded-xl bg-blue-100 hover:bg-blue-200"
            >
              📊 Health Reports
            </Link>


          </div>


        </div>




        {/* HerSphere Message */}


        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8">


          <h2 className="text-2xl font-bold text-pink-600">
            Your wellness journey matters 🌱
          </h2>


          <p className="mt-3 text-gray-700">
            HerSphere helps you understand your body, track your habits,
            and make informed wellness decisions every day.
          </p>


        </div>


      </div>


    </AuthenticatedLayout>

  );
}