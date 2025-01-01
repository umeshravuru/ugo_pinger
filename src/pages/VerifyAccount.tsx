// import React, { useEffect } from 'react';
// import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
// import { AuthCard } from '../components/auth/AuthCard';
// import { Button } from '../components/ui/Button';
// import { Link } from '../components/ui/Link';
// import { useVerification } from '../hooks/useVerification';
//
// export function VerifyAccount() {
//     const { verifyAccount, isLoading, error } = useVerification();
//
//     useEffect(() => {
//         verifyAccount();
//     }, []);
//
//     if (isLoading) {
//         return (
//             <AuthCard
//                 title="Verifying Your Account"
//                 subtitle="Please wait while we verify your account"
//             >
//                 <div className="text-center">
//                     <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
//                     <p className="text-gray-600">Verifying your account...</p>
//                 </div>
//             </AuthCard>
//         );
//     }
//
//     if (error) {
//         return (
//             <AuthCard
//                 title="Verification Failed"
//                 subtitle="We couldn't verify your account"
//             >
//                 <div className="text-center">
//                     <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
//                     <p className="text-gray-600 mb-6">{error}</p>
//                     <Link to="/register">
//                         <Button>
//                             Back to Sign Up
//                         </Button>
//                     </Link>
//                 </div>
//             </AuthCard>
//         );
//     }
//
//     return (
//         <AuthCard
//             title="Account Verified"
//             subtitle="Your account has been successfully verified"
//         >
//             <div className="text-center">
//                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
//                 <p className="text-gray-600 mb-6">
//                     You can now sign in to your account
//                 </p>
//                 <Link to="/login">
//                     <Button>
//                         Sign In
//                     </Button>
//                 </Link>
//             </div>
//         </AuthCard>
//     );
// }