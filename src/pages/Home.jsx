import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Star } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary-bg to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 leading-tight mb-4">
                Your Personal
                <br />
                <span className="text-primary">AI Skincare Assistant</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Discover a personalized skincare routine tailored to your unique
                needs with our AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    navigate(user ? "/ai-recommendations" : "/sign-in")
                  }
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="btn-secondary"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/5927811/pexels-photo-5927811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Woman with glowing skin"
                className="rounded-2xl shadow-medium object-cover max-h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Jild Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg">
              <div className="bg-primary-bg p-4 rounded-full mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-neutral-600">
                Our advanced AI scans your skin and analyzes your unique
                concerns to create a personalized profile.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg">
              <div className="bg-primary-bg p-4 rounded-full mb-4">
                <Shield size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Recommendations
              </h3>
              <p className="text-neutral-600">
                Receive a customized skincare routine and product
                recommendations based on your skin&apos;s specific needs.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg">
              <div className="bg-primary-bg p-4 rounded-full mb-4">
                <Star size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-neutral-600">
                Track your progress and enjoy the benefits of a skincare routine
                that&apos;s scientifically tailored to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                &quot;Jild helped me understand my skin like never before. The
                personalized routine has completely transformed my skin!&quot;
              </p>
              <p className="font-semibold">- Sarah T.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                &quot;After struggling with acne for years, Jild&apos;s
                recommendations finally gave me clear skin. I can&apos;t believe
                the difference!&quot;
              </p>
              <p className="font-semibold">- Michael K.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                &quot;The questionnaire was thorough and the AI analysis was
                surprisingly accurate. So happy with my new skincare
                routine!&quot;
              </p>
              <p className="font-semibold">- Emma R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Your Personalized Skincare Journey?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Take the first step towards healthier, more radiant skin with our
            AI-powered recommendations.
          </p>
          <button
            onClick={() => navigate(user ? "/ai-recommendations" : "/sign-in")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
