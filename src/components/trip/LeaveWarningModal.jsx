import { useNavigate } from "react-router-dom";

export default function LeaveWarningModal({ isLoggedIn, onDismiss, onLeave }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-peak-card border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
        <h3 className="font-display font-bold text-peak-text text-xl mb-2">Leave trip planning?</h3>
        <p className="text-peak-text-secondary text-sm mb-6">
          {isLoggedIn
            ? "Your trip draft has been saved automatically. You can return to continue planning later."
            : "You have unfinished trip planning in progress. Your selections will be lost unless you sign in."}
        </p>
        <div className="flex flex-col gap-2">
          {isLoggedIn ? (
            <>
              <button onClick={onDismiss} className="w-full py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">
                Continue planning
              </button>
              <button onClick={onLeave} className="w-full py-2.5 border border-white/10 text-peak-text-secondary rounded-xl hover:text-peak-text transition-colors">
                Leave — draft saved
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/auth")} className="w-full py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">
                Sign in to save
              </button>
              <button onClick={onLeave} className="w-full py-2.5 border border-white/10 text-peak-text-secondary rounded-xl hover:text-peak-text transition-colors">
                Leave without saving
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}