import SignInForm from '../components/auth/SignInForm';

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg">
      <div className="bg-white p-8 rounded-xl shadow-medium max-w-md w-full">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;