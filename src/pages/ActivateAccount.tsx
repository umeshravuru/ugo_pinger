// import React, { useState } from 'react';
// import { CheckCircle } from 'lucide-react';
// import { AuthCard } from '../components/auth/AuthCard';
// import { Button } from '../components/ui/Button';
//
// export function ActivateAccount() {
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleActivation = () => {
//     setIsLoading(true);
//     // Add activation logic here
//     setTimeout(() => setIsLoading(false), 1000);
//   };
//
//   return (
//     <AuthCard
//       title="Activate Your Account"
//       subtitle="You're almost there! Click the button below to activate your account."
//     >
//       <div className="text-center">
//         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
//         <Button
//           onClick={handleActivation}
//           isLoading={isLoading}
//           className="mt-6"
//         >
//           Activate Account
//         </Button>
//         <p className="text-sm text-gray-600 mt-4">
//           Didn't receive the activation email?{' '}
//           <button className="text-indigo-600 hover:text-indigo-500">
//             Resend email
//           </button>
//         </p>
//       </div>
//     </AuthCard>
//   );
// }