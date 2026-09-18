import { StarIcon } from "./Icons";

export default function StarRating({ rating, count, label = "ratings" }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <p className="product-card-rating">
      <span className="star-row" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.max(0, Math.min(1, value - index));
          return (
            <span key={index} className="star-slot">
              <StarIcon className="star-ghost" />
              <span className="star-fill" style={{ width: `${fill * 100}%` }}>
                <StarIcon />
              </span>
            </span>
          );
        })}
      </span>
      <span>{rating}</span>
      {count ? <span>({count}{label ? ` ${label}` : ""})</span> : null}
    </p>
  );
}
