import React from "react";
import { useEvents } from "../context/EventsContext";
import { CATEGORIES, FORMAT_OPTIONS, SORT_OPTIONS } from "../data/initialEvents";
import { 
  Search, 
  LayoutGrid, 
  List, 
  Heart, 
  RotateCcw, 
  ArrowUpDown,
  MapPin,
  Tag
} from "lucide-react";

export const FilterBar = () => {
  const {
    filteredEvents,
    events,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedFormat,
    setSelectedFormat,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    favourites,
    showFavouritesOnly,
    setShowFavouritesOnly,
    resetFilters
  } = useEvents();

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedFormat !== "All Formats" ||
    sortBy !== "date-asc" ||
    showFavouritesOnly;

  return (
    <div className="filter-bar-wrapper">
      <div className="filter-bar-inner">
        {/* Top row: Search and Quick Toggles */}
        <div className="filter-row-primary">
          <div className="filter-search-box">
            <Search className="filter-search-icon" size={17} />
            <input
              type="text"
              placeholder="Search by NMIT labs, topic, organizer, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
              aria-label="Filter events by keyword"
            />
            {searchQuery && (
              <button
                className="filter-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear filter search"
              >
                ×
              </button>
            )}
          </div>

          <button
            className={`favourites-toggle-pill ${showFavouritesOnly ? "active" : ""}`}
            onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
            aria-pressed={showFavouritesOnly}
          >
            <Heart size={16} className={showFavouritesOnly ? "fill-rose-500 text-rose-500" : ""} />
            <span>Saved Only</span>
            <span className="fav-pill-badge">{favourites.length}</span>
          </button>
        </div>

        {/* Bottom row: Selectors, Sorter, View Toggles & Reset */}
        <div className="filter-row-secondary">
          <div className="filter-select-group">
            <label htmlFor="category-select" className="filter-label">
              <Tag size={13} />
              <span>Category</span>
            </label>
            <select
              id="category-select"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => {
                setShowFavouritesOnly(false);
                setSelectedCategory(e.target.value);
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label htmlFor="format-select" className="filter-label">
              <MapPin size={13} />
              <span>Format</span>
            </label>
            <select
              id="format-select"
              className="filter-select"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {FORMAT_OPTIONS.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label htmlFor="sort-select" className="filter-label">
              <ArrowUpDown size={13} />
              <span>Sort By</span>
            </label>
            <select
              id="sort-select"
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-controls-right">
            {hasActiveFilters && (
              <button
                className="reset-filters-btn"
                onClick={resetFilters}
                title="Reset all active search and filter options"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}

            <div className="view-mode-toggle" role="group" aria-label="Layout view mode">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid layout"
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="List layout"
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Query Feedback */}
        <div className="filter-status-bar">
          <span className="results-count-text">
            Showing <strong>{filteredEvents.length}</strong> of <strong>{events.length}</strong> events
            {showFavouritesOnly && <span className="fav-filter-notice"> (Favorites Filtered)</span>}
          </span>
          {searchQuery && (
            <span className="active-query-chip">
              Matching: "<em>{searchQuery}</em>"
              <button onClick={() => setSearchQuery("")} aria-label="Remove search term">×</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
