"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import EmptyState from "@/components/EmptyState";
import Field from "@/components/Field";
import { LAST_ORDER_KEY, mockAddresses, mockOrders, products } from "@/lib/data";
import { ArrowIcon, HeartIcon } from "@/components/Icons";
import { useToast, useWishlist } from "@/components/UiProviders";
import { firstError, required, validatePostcode } from "@/lib/validation";

const profile = {
  name: "Alex Researcher",
  email: "researcher@lab.example",
  phone: "+44 7700 900123",
  organisation: "North Lab Collective",
};

export default function AccountPageClient() {
  const { ids, toggle, count } = useWishlist();
  const { pushToast } = useToast();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [editing, setEditing] = useState(false);
  const [addressErrors, setAddressErrors] = useState({});
  const [latest, setLatest] = useState(mockOrders[0]);
  const [form, setForm] = useState({
    label: "",
    name: profile.name,
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    phone: profile.phone,
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LAST_ORDER_KEY);
      if (!raw) return;
      const last = JSON.parse(raw);
      if (last?.id) setLatest(last);
    } catch {
      /* ignore */
    }
  }, []);

  const wished = useMemo(
    () => products.filter((product) => ids.includes(product.id)),
    [ids]
  );

  const setPrimary = (id) => {
    setAddresses((current) =>
      current.map((address) => ({ ...address, primary: address.id === id }))
    );
    pushToast("Primary address updated", "success");
  };

  const removeAddress = (id) => {
    setAddresses((current) => current.filter((address) => address.id !== id));
    pushToast("Address removed", "muted");
  };

  const saveAddress = (event) => {
    event.preventDefault();
    const next = {
      label: required(form.label, "Label"),
      name: required(form.name, "Full name"),
      line1: required(form.line1, "Address"),
      city: required(form.city, "City"),
      postcode: validatePostcode(form.postcode),
    };
    setAddressErrors(next);
    if (firstError(next)) {
      pushToast("Please fix the highlighted fields", "muted");
      return;
    }
    const entry = {
      ...form,
      id: `addr-${Date.now()}`,
      primary: addresses.length === 0,
    };
    setAddresses((current) => [...current, entry]);
    setForm({
      label: "",
      name: profile.name,
      line1: "",
      line2: "",
      city: "",
      postcode: "",
      country: "United Kingdom",
      phone: profile.phone,
    });
    setAddressErrors({});
    setEditing(false);
    pushToast("Address saved", "success");
  };

  return (
    <>
      <PageHero
        kicker="Account"
        title="My account"
        body="Profile, addresses, wishlist and recent orders — frontend mock only."
        crumbs={[{ label: "Account" }]}
      />

      <section className="page-section">
        <div className="page-wrap account-layout">
          <aside className="account-nav">
            <p className="label text-faint">Signed in as</p>
            <p className="mt-2 text-lg">{profile.name}</p>
            <p className="copy mt-1" style={{ fontSize: "13px" }}>
              {profile.email}
            </p>
            <nav className="account-nav-links">
              <a href="#overview" aria-current="page">
                Overview
              </a>
              <a href="#addresses">Addresses</a>
              <a href="#wishlist">Wishlist ({count})</a>
              <Link href="/account/orders">Orders</Link>
              <Link href="/login">Sign out</Link>
            </nav>
          </aside>

          <div className="account-main" id="overview">
            <div className="account-card">
              <p className="label text-faint">Profile</p>
              <dl className="profile-grid">
                <div>
                  <dt>Name</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{profile.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{profile.phone}</dd>
                </div>
                <div>
                  <dt>Organisation</dt>
                  <dd>{profile.organisation}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="btn btn-hero-ghost"
                onClick={() => pushToast("Profile editing arrives with authentication", "muted")}
              >
                Edit profile
              </button>
            </div>

            <div className="account-card">
              <p className="label text-faint">Latest order</p>
              {latest ? (
                <>
                  <h2 className="mt-3 text-xl">{latest.id}</h2>
                  <p className="copy mt-2">
                    {latest.date} · {latest.status} · {latest.total}
                  </p>
                  <Link href={`/account/orders/${latest.id}`} className="text-link mt-5">
                    View order
                    <ArrowIcon />
                  </Link>
                </>
              ) : (
                <EmptyState
                  kicker=""
                  title="No orders yet"
                  body="Place a mock checkout to preview order history in this browser."
                  href="/shop"
                  action="Browse shop"
                />
              )}
            </div>

            <div className="account-card" id="addresses">
              <div className="catalogue-toolbar" style={{ marginTop: 0 }}>
                <p className="label text-faint">Saved addresses</p>
                <button type="button" className="text-link" onClick={() => setEditing((value) => !value)}>
                  {editing ? "Cancel" : "Add address"}
                </button>
              </div>

              {addresses.length === 0 ? (
                <EmptyState
                  kicker="No addresses"
                  title="Save a delivery address"
                  body="Addresses are stored in this session for the UI preview."
                  href={null}
                />
              ) : (
                <div className="address-grid">
                  {addresses.map((address) => (
                    <article key={address.id} className={`address-card ${address.primary ? "is-primary" : ""}`}>
                      <div className="address-card-top">
                        <p className="label text-faint">{address.label}</p>
                        {address.primary ? <span className="address-pill">Primary</span> : null}
                      </div>
                      <p className="mt-2 font-medium">{address.name}</p>
                      <p className="copy mt-2" style={{ fontSize: "13px" }}>
                        {address.line1}
                        {address.line2 ? `, ${address.line2}` : ""}
                        <br />
                        {address.city}, {address.postcode}
                        <br />
                        {address.country}
                      </p>
                      <div className="address-actions">
                        {!address.primary ? (
                          <button type="button" onClick={() => setPrimary(address.id)}>
                            Make primary
                          </button>
                        ) : null}
                        <button type="button" onClick={() => removeAddress(address.id)}>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {editing ? (
                <form className="address-form" onSubmit={saveAddress} noValidate>
                  <div className="form-grid">
                    <Field label="Label" name="label" error={addressErrors.label}>
                      {({ describedBy, invalid }) => (
                        <input
                          value={form.label}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          onChange={(event) => setForm({ ...form, label: event.target.value })}
                          placeholder="Warehouse"
                        />
                      )}
                    </Field>
                    <Field label="Full name" name="name" error={addressErrors.name}>
                      {({ describedBy, invalid }) => (
                        <input
                          value={form.name}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                      )}
                    </Field>
                    <Field label="Address line 1" name="line1" className="form-span-2" error={addressErrors.line1}>
                      {({ describedBy, invalid }) => (
                        <input
                          value={form.line1}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          onChange={(event) => setForm({ ...form, line1: event.target.value })}
                        />
                      )}
                    </Field>
                    <Field label="Address line 2" name="line2" className="form-span-2">
                      <input
                        value={form.line2}
                        onChange={(event) => setForm({ ...form, line2: event.target.value })}
                      />
                    </Field>
                    <Field label="City" name="city" error={addressErrors.city}>
                      {({ describedBy, invalid }) => (
                        <input
                          value={form.city}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          onChange={(event) => setForm({ ...form, city: event.target.value })}
                        />
                      )}
                    </Field>
                    <Field label="Postcode" name="postcode" error={addressErrors.postcode}>
                      {({ describedBy, invalid }) => (
                        <input
                          value={form.postcode}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          onChange={(event) => setForm({ ...form, postcode: event.target.value })}
                        />
                      )}
                    </Field>
                  </div>
                  <button type="submit" className="btn btn-hero mt-4">
                    Save address
                  </button>
                </form>
              ) : null}
            </div>

            <div className="account-card" id="wishlist">
              <div className="catalogue-toolbar" style={{ marginTop: 0 }}>
                <p className="label text-faint">Wishlist</p>
                <span className="label text-faint">{String(count).padStart(2, "0")} saved</span>
              </div>

              {wished.length === 0 ? (
                <EmptyState
                  kicker="Wishlist empty"
                  title="No saved products yet"
                  body="Tap the heart on any product card to save it here."
                  href="/shop"
                  action="Browse catalogue"
                />
              ) : (
                <div className="wishlist-grid">
                  {wished.map((product) => (
                    <article key={product.id} className="wishlist-item">
                      <div className="wishlist-thumb">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain object-center"
                          sizes="72px"
                        />
                      </div>
                      <div>
                        <Link href={`/product/${product.slug}`}>
                          <h3>{product.name}</h3>
                        </Link>
                        <p>{product.priceLabel}</p>
                      </div>
                      <button
                        type="button"
                        className="wishlist-btn is-active"
                        aria-label={`Remove ${product.name} from wishlist`}
                        onClick={() => toggle(product)}
                      >
                        <HeartIcon filled />
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
