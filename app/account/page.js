"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { mockAddresses, mockOrders, products } from "@/lib/data";
import { ArrowIcon, HeartIcon } from "@/components/Icons";
import { useToast, useWishlist } from "@/components/UiProviders";

const profile = {
  name: "Alex Researcher",
  email: "researcher@lab.example",
  phone: "+44 7700 900123",
  organisation: "North Lab Collective",
};

export default function AccountPage() {
  const latest = mockOrders[0];
  const { ids, toggle, count } = useWishlist();
  const { pushToast } = useToast();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [editing, setEditing] = useState(false);
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
    setEditing(false);
    pushToast("Address saved", "success");
  };

  return (
    <SiteShell>
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
              <h2 className="mt-3 text-xl">{latest.id}</h2>
              <p className="copy mt-2">
                {latest.date} · {latest.status} · {latest.total}
              </p>
              <Link href={`/account/orders/${latest.id}`} className="text-link mt-5">
                View order
                <ArrowIcon />
              </Link>
            </div>

            <div className="account-card" id="addresses">
              <div className="catalogue-toolbar" style={{ marginTop: 0 }}>
                <p className="label text-faint">Saved addresses</p>
                <button type="button" className="text-link" onClick={() => setEditing((value) => !value)}>
                  {editing ? "Cancel" : "Add address"}
                </button>
              </div>

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

              {editing ? (
                <form className="address-form" onSubmit={saveAddress}>
                  <div className="form-grid">
                    <label>
                      Label
                      <input
                        required
                        value={form.label}
                        onChange={(event) => setForm({ ...form, label: event.target.value })}
                        placeholder="Warehouse"
                      />
                    </label>
                    <label>
                      Full name
                      <input
                        required
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                      />
                    </label>
                    <label className="form-span-2">
                      Address line 1
                      <input
                        required
                        value={form.line1}
                        onChange={(event) => setForm({ ...form, line1: event.target.value })}
                      />
                    </label>
                    <label className="form-span-2">
                      Address line 2
                      <input
                        value={form.line2}
                        onChange={(event) => setForm({ ...form, line2: event.target.value })}
                      />
                    </label>
                    <label>
                      City
                      <input
                        required
                        value={form.city}
                        onChange={(event) => setForm({ ...form, city: event.target.value })}
                      />
                    </label>
                    <label>
                      Postcode
                      <input
                        required
                        value={form.postcode}
                        onChange={(event) => setForm({ ...form, postcode: event.target.value })}
                      />
                    </label>
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
                <div className="empty-state" style={{ borderTop: 0, paddingTop: "1rem" }}>
                  <p className="copy">No saved products yet. Tap the heart on any product card.</p>
                  <Link href="/shop" className="btn btn-hero-ghost mt-5">
                    Browse catalogue
                  </Link>
                </div>
              ) : (
                <div className="wishlist-grid">
                  {wished.map((product) => (
                    <article key={product.id} className="wishlist-item">
                      <div className="wishlist-thumb">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
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
                        aria-label="Remove from wishlist"
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
    </SiteShell>
  );
}
