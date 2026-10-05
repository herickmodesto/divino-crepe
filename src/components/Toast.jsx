export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <div className="toast-msg" key={message}>
        ✓ {message}
      </div>
    </div>
  );
}
