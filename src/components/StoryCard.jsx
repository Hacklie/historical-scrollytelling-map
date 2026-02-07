import { safeImageUrl } from "../utils/imageUtils";

/**
 * StoryCard: Displays a single historical event with image and details
 */
export default function StoryCard({ event, index }) {
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const imgSrc = safeImageUrl(event.image);

  return (
    <div className="story-card" data-index={index}>
      <div className="story-card-content">
        <span className="story-number">
          Battle #{index + 1} of {event.totalCount}
        </span>
        <h2>{event.eventLabel}</h2>
        <p className="event-date">{formatDate(event.date)}</p>
        <p className="event-description">{event.eventDescription}</p>

        {imgSrc && (
          <div className="event-image">
            <img
              src={imgSrc}
              alt={event.eventLabel}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
