function LoadingSpinner({ size }: { size: string }) {
  return (
    <div
      className={`h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
    </div>
  );
}

export default LoadingSpinner;
