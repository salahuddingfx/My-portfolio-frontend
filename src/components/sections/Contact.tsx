"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

import PremiumCard from "@/components/ui/PremiumCard";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("Missing API URL");
      }

      const res = await fetch(
        `${apiUrl}/admin/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setStatus("success");

        setFormData({
          name: "",
          email: "",
          subject: "Web Development",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);

      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="
        section-shell
        relative
        overflow-hidden
        bg-black
      "
    >
      <div className="container relative z-10">

        {/* HEADER */}
        <div
          className="
            text-center
            max-w-2xl
            mx-auto
            mb-20
            space-y-6
          "
        >
          <span className="section-kicker">
            Contact
          </span>

          <h2
            className="
              text-[clamp(3rem,6vw,5rem)]
              tracking-[-0.06em]
              leading-[0.95]
              font-bold
              text-white
            "
          >
            Let&apos;s
            <span className="text-accent">
              {" "}
              Connect.
            </span>
          </h2>

          <p
            className="
              text-white/60
              leading-8
              text-[15px]
            "
          >
            Have a project in mind or want
            to discuss an idea? Feel free
            to reach out.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            lg:grid-cols-12
            gap-16
            lg:gap-20
            items-start
          "
        >

          {/* LEFT */}
          <div
            className="
              lg:col-span-4
              space-y-8
            "
          >

            {/* EMAIL */}
            <div
              className="
                flex
                items-center
                gap-5
                border
                border-white/5
                rounded-2xl
                p-5
                bg-white/[0.02]
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  border
                  border-white/5
                  flex
                  items-center
                  justify-center
                  text-white/50
                "
              >
                <Mail size={20} />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.08em]
                    text-white/30
                    mb-1
                  "
                >
                  Email
                </p>

                <p
                  className="
                    text-[15px]
                    text-white/70
                    font-medium
                  "
                >
                  salahuddinkadrappy@gmail.com
                </p>
              </div>

            </div>

            {/* LOCATION */}
            <div
              className="
                flex
                items-center
                gap-5
                border
                border-white/5
                rounded-2xl
                p-5
                bg-white/[0.02]
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  border
                  border-white/5
                  flex
                  items-center
                  justify-center
                  text-white/50
                "
              >
                <MapPin size={20} />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.08em]
                    text-white/30
                    mb-1
                  "
                >
                  Location
                </p>

                <p
                  className="
                    text-[15px]
                    text-white/70
                    font-medium
                  "
                >
                  Cox&apos;s Bazar, Bangladesh
                </p>
              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="lg:col-span-8">

            <PremiumCard
              className="
                !p-8
                md:!p-10
                border-white/5
                bg-white/[0.02]
              "
            >

              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >

                {/* INPUTS */}
                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-6
                  "
                >

                  <div className="space-y-3">

                    <label
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.08em]
                        text-white/40
                      "
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/5
                        bg-white/[0.03]
                        px-5
                        py-4
                        text-white
                        outline-none
                        transition-colors
                        focus:border-accent/30
                      "
                      placeholder="Your Name"
                    />

                  </div>

                  <div className="space-y-3">

                    <label
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.08em]
                        text-white/40
                      "
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/5
                        bg-white/[0.03]
                        px-5
                        py-4
                        text-white
                        outline-none
                        transition-colors
                        focus:border-accent/30
                      "
                      placeholder="Your Email"
                    />

                  </div>

                </div>

                {/* SELECT */}
                <div className="space-y-3">

                  <label
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.08em]
                      text-white/40
                    "
                  >
                    Inquiry
                  </label>

                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                      })
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/5
                      bg-white/[0.03]
                      px-5
                      py-4
                      text-white
                      outline-none
                      appearance-none
                      transition-colors
                      focus:border-accent/30
                    "
                  >
                    <option>
                      Web Development
                    </option>

                    <option>
                      UI Design
                    </option>

                    <option>
                      Full Stack Project
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>

                {/* MESSAGE */}
                <div className="space-y-3">

                  <label
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.08em]
                      text-white/40
                    "
                  >
                    Message
                  </label>

                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/5
                      bg-white/[0.03]
                      px-5
                      py-4
                      text-white
                      outline-none
                      resize-none
                      transition-colors
                      focus:border-accent/30
                    "
                    placeholder="Tell me about your project..."
                  />

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={
                    status === "sending"
                  }
                  className="
                    btn-primary
                    w-full
                    py-4
                    disabled:opacity-50
                  "
                >

                  <span
                    className="
                      text-[13px]
                      font-medium
                      tracking-[0.06em]
                    "
                  >
                    {status === "sending"
                      ? "Sending..."
                      : status === "success"
                      ? "Message Sent"
                      : "Send Message"}
                  </span>

                  <Send size={16} />

                </button>

                {/* ERROR */}
                {status === "error" && (
                  <p
                    className="
                      text-center
                      text-sm
                      text-red-400
                    "
                  >
                    Failed to send message.
                  </p>
                )}

              </form>

            </PremiumCard>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;