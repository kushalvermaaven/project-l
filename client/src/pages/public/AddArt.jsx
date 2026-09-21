import React from 'react';

const AddArt = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-6">Add Art</h1>
        <p className="text-[var(--text-muted)] mb-8">Submit your artwork to our platform.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-2">Title</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" placeholder="Artwork title" />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" rows="4" placeholder="Description"></textarea>
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
              Submit Artwork
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArt;
