"use client"
import EditProfileForm from "./edit"
import { ChevronLeft } from "lucide-react"

export default function EditProfilePage() {
  // Using a simplified layout for the edit page
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <a
            href="/profile"
            className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </a>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile Settings</h1>
            <p className="text-gray-500 mt-1">Manage your professional identity and personal details</p>
          </div>
        </div>

        <EditProfileForm />
      </div>
    </div>
  )
}
