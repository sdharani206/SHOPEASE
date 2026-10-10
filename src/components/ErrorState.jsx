function ErrorState({ message, onRetry }) {
  return (
    <div className="state-box" role="alert">
      <div className="state-icon">⚠️</div>
      <h2>Oops!</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
