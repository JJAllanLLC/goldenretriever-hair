import { NewsletterForm } from "@/components/NewsletterForm";

export function SleepGuideNewsletterSignup() {
  return (
    <section
      className="not-prose my-12 rounded-xl border border-amber-200 bg-amber-50 px-5 py-8 text-center shadow-sm sm:px-8 [&>div]:max-w-2xl [&_form]:max-w-2xl"
      aria-labelledby="sleep-guide-newsletter-heading"
    >
      <h2 id="sleep-guide-newsletter-heading" className="text-2xl font-bold text-amber-900 sm:text-3xl">
        Keep your Golden’s daily routine handy
      </h2>
      <p className="mx-auto mb-6 mt-3 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
        Join our newsletter and get the free Golden Retriever Owner Cheat Sheet: a printable overview of sleep,
        meals, and everyday care from puppyhood to senior years.
      </p>
      <NewsletterForm
        variant="light"
        analyticsSource="puppy_sleep_chart"
        buttonLabel="Email me the free cheat sheet"
        wrapButtonLabelBelow375
        formLabel="Puppy sleep guide newsletter signup"
        showIntro={false}
        showSmallText={false}
      />
    </section>
  );
}
