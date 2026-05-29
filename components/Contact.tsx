"use client";

import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsLinkedin, BsGithub, BsEnvelope } from "react-icons/bs";

import SectionHeading from "./SectionHeading";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "./SubmitButton";

const inputClasses =
  "w-full rounded-2xl border border-white/10 bg-ink-900 px-5 py-4 text-bone placeholder:text-bone-dim outline-none transition-colors focus:border-volt";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <section
      ref={ref}
      id="contact"
      className="mx-auto max-w-wide scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        {/* Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Contact</span>
          <h2 className="mt-5 font-display text-display font-extrabold leading-none text-bone">
            Let&apos;s build
            <br />
            <span className="text-volt">something great.</span>
          </h2>
          <p className="mt-7 max-w-md text-lg text-bone-muted">
            Hiring for a role or have a project in mind? I read every message and
            reply within a day or two.
          </p>

          <a
            href="mailto:pasanratnayake@gmail.com"
            className="mt-8 inline-block font-display text-xl font-bold text-bone underline decoration-volt decoration-2 underline-offset-8 transition-colors hover:text-volt"
          >
            pasanratnayake@gmail.com
          </a>

          <div className="mt-8 flex items-center gap-3">
            <a href="mailto:pasanratnayake@gmail.com" aria-label="Email" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-bone-muted transition-colors hover:border-volt hover:text-volt">
              <BsEnvelope />
            </a>
            <a href="https://www.linkedin.com/in/pasanratnayake/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-bone-muted transition-colors hover:border-volt hover:text-volt">
              <BsLinkedin />
            </a>
            <a href="https://github.com/pasan1227" target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-bone-muted transition-colors hover:border-volt hover:text-volt">
              <BsGithub />
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="surface flex flex-col gap-4 rounded-3xl p-7 sm:p-8"
          action={async (formData) => {
            const { error } = await sendEmail(formData);
            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Message sent — I'll be in touch soon!");
          }}
        >
          <input
            className={inputClasses}
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your email"
          />
          <textarea
            className={`${inputClasses} h-48 resize-none`}
            name="message"
            placeholder="Tell me about the role or project…"
            required
            maxLength={5000}
          />
          <SubmitButton />
        </motion.form>
      </div>
    </section>
  );
}
