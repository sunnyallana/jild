import SignUpForm from '../components/auth/SignUpForm';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg">
      <div className="bg-white p-8 rounded-xl shadow-medium max-w-md w-full">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;