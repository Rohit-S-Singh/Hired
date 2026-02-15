"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8 md:p-12">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>

        <p className="text-gray-500 text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            Welcome to <strong>RealHired</strong>. Your privacy is important to
            us. This Privacy Policy explains how we collect, use, store, and
            protect your information when you use our website, browser
            extension, and related services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Information We Collect
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Name, email address, and account details</li>
            <li>Job preferences and profile information</li>
            <li>Usage data such as pages visited and actions taken</li>
            <li>Browser extension activity related to job listings</li>
            <li>Device information such as browser type and IP address</li>
          </ul>
        </section>

        {/* How We Use */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide and improve our services</li>
            <li>Show relevant job opportunities</li>
            <li>Personalize your experience</li>
            <li>Communicate important updates</li>
            <li>Prevent fraud and ensure security</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Data Sharing
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal data. We may share data with trusted
            service providers who help us operate our platform, and when
            required by law.
          </p>
        </section>

        {/* Chrome Extension */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Chrome Extension Permissions
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Our browser extension may access job listing pages to extract
            relevant job information and enhance your job search experience.
            We do not collect unrelated browsing data.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Data Security
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We implement appropriate security measures to protect your data from
            unauthorized access, disclosure, or loss.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Your Rights
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You can update or delete your account anytime</li>
            <li>You can request access to your data</li>
            <li>You can request deletion of your data</li>
          </ul>
        </section>

        {/* Third Party */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Third-Party Services
          </h2>

          <p className="text-gray-700 leading-relaxed">
            RealHired may contain links to third-party websites. We are not
            responsible for their privacy practices.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Changes to this Policy
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We may update this policy from time to time. Changes will be posted
            on this page.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            9. Contact Us
          </h2>

          <p className="text-gray-700">
            If you have questions, contact us at:
          </p>

          <p className="text-blue-600 font-medium mt-2">
            support@realhired.com
          </p>
        </section>

      </div>
    </div>
  );
}
