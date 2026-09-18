"use client";

import { useState } from "react";
import Field from "@/components/Field";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";
import { firstError, required, validateEmail, validateMessage } from "@/lib/validation";

const emptyForm = { name: "", email: "", topic: "product", product: "", message: "" };

const topics = [
  { id: "product", label: "Product detail" },
  { id: "documents", label: "Batch documents" },
  { id: "shipping", label: "Dispatch" },
  { id: "returns", label: "Returns" },
  { id: "other", label: "Other" },
];

export default function ContactForm() {
  const { pushToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {
      name: required(form.name, "Name"),
      email: validateEmail(form.email),
      topic: required(form.topic, "Topic"),
      message: validateMessage(form.message),
    };
    setErrors(next);
    if (firstError(next)) {
      pushToast("Please fix the highlighted fields", "muted");
      event.currentTarget.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm(emptyForm);
      pushToast("Message captured (UI preview)", "success");
    }, 550);
  };

  if (sent) {
    return (
      <div className="cart-panel checkout-confirm-card contact-success">
        <span className="checkout-confirm-icon" aria-hidden="true">
          <CheckIcon />
        </span>
        <p className="label text-faint">Message received</p>
        <p className="checkout-confirm-id">Thanks — we have your note</p>
        <p className="copy checkout-confirm-copy">
          This is a frontend confirmation. No email was dispatched. Product, document, and dispatch
          questions will route to the support inbox once live mail is connected.
        </p>
        <button type="button" className="btn btn-hero contact-submit" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="cart-panel checkout-card contact-form" onSubmit={submit} noValidate>
      <fieldset>
        <legend className="label text-faint">Your message</legend>
        <div className="form-grid">
          <Field label="Name" name="name" error={errors.name}>
            {({ describedBy, invalid }) => (
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                onChange={(event) => setValue("name", event.target.value)}
              />
            )}
          </Field>
          <Field label="Email" name="email" error={errors.email}>
            {({ describedBy, invalid }) => (
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                onChange={(event) => setValue("email", event.target.value)}
              />
            )}
          </Field>
          <div className={`field form-span-2 ${errors.topic ? "is-invalid" : ""}`}>
            <span className="field-label-row">
              <span>Topic</span>
            </span>
            <div className="contact-topics" role="group" aria-label="Message topic">
              {topics.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={form.topic === item.id}
                  className={form.topic === item.id ? "is-active" : ""}
                  onClick={() => setValue("topic", item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {errors.topic ? (
              <span id="topic-error" className="field-error" role="alert">
                {errors.topic}
              </span>
            ) : null}
          </div>
          <Field label="Product" name="product" className="form-span-2" hint="Optional">
            <input
              type="text"
              name="product"
              value={form.product}
              placeholder="Listed product name, if relevant"
              onChange={(event) => setValue("product", event.target.value)}
            />
          </Field>
          <Field label="Message" name="message" className="form-span-2" error={errors.message}>
            {({ describedBy, invalid }) => (
              <textarea
                name="message"
                rows={6}
                value={form.message}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                onChange={(event) => setValue("message", event.target.value)}
              />
            )}
          </Field>
        </div>
      </fieldset>
      <button type="submit" className="btn btn-hero contact-submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
        {!submitting ? <ArrowIcon /> : null}
      </button>
      <p className="checkout-pay-note">UI preview only. No email is sent from this form yet.</p>
    </form>
  );
}
