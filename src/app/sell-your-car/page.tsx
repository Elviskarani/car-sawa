"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SellYourCarPage() {
  const router = useRouter();
  const googleFormURL = 'https://forms.gle/ttebyUczkCa7KebYA'; // Replace with your actual Google Form URL

  useEffect(() => {
    // Redirect to the Google Form URL when the component mounts
    router.push(googleFormURL);
  }, [router, googleFormURL]);

  // You can optionally render a fallback message while the redirect happens
  return (
    <p>Redirecting you to our car selling form...</p>
  );
}
