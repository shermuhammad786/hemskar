'use client'
import { FC } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from 'next/link';

const LandingPage: FC = () => {
    return (
        <DefaultLayout>
            <div className="relative overflow-hidden">
                {/* Hero Section */}
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
                            <div className="max-w-xl mb-6">
                                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                    Welcome to Student
                                    <br className="hidden md:block" />
                                    Management System
                                </h2>
                                <p className="text-base text-gray-700 md:text-lg">
                                    Streamline your academic journey with our comprehensive student management platform.
                                    Track progress, manage courses, and achieve your educational goals.
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:flex-row">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 md:w-auto md:mr-4 md:mb-0"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-700"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        {/* Feature Cards */}
                        <div className="grid gap-5 row-gap-5 sm:grid-cols-2">
                            <div className="px-8 py-4 bg-white rounded-lg shadow-lg">
                                <h6 className="mb-2 font-semibold leading-5">Course Management</h6>
                                <p className="text-sm text-gray-700">
                                    Easily manage your courses, assignments, and academic schedule
                                </p>
                            </div>
                            <div className="px-8 py-4 bg-white rounded-lg shadow-lg">
                                <h6 className="mb-2 font-semibold leading-5">Progress Tracking</h6>
                                <p className="text-sm text-gray-700">
                                    Monitor your academic progress and achievements in real-time
                                </p>
                            </div>
                            <div className="px-8 py-4 bg-white rounded-lg shadow-lg">
                                <h6 className="mb-2 font-semibold leading-5">Resource Access</h6>
                                <p className="text-sm text-gray-700">
                                    Access study materials and resources anytime, anywhere
                                </p>
                            </div>
                            <div className="px-8 py-4 bg-white rounded-lg shadow-lg">
                                <h6 className="mb-2 font-semibold leading-5">Communication Hub</h6>
                                <p className="text-sm text-gray-700">
                                    Stay connected with professors and peers through integrated messaging
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default LandingPage;