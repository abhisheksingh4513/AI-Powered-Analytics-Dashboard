"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  SlidersHorizontal, 
  X, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Filter,
  RotateCcw,
  Loader2
} from "lucide-react";
import { TableRow } from "@/lib/data";

export interface FilterState {
  dateRange: {
    start: string;
    end: string;
  };
  status: string[];
  category: string[];
  platform: string[];
  roiRange: {
    min: number;
    max: number;
  };
  costRange: {
    min: number;
    max: number;
  };
  searchTerm: string;
}

interface AdvancedFiltersProps {
  data: TableRow[];
  onFiltersChange: (filteredData: TableRow[]) => void;
  initialFilters?: Partial<FilterState>;
}

const defaultFilters: FilterState = {
  dateRange: { start: "", end: "" },
  status: [],
  category: [],
  platform: [],
  roiRange: { min: 0, max: 1000 },
  costRange: { min: 0, max: 50000 },
  searchTerm: "",
};

export function AdvancedFilters({ 
  data, 
  onFiltersChange, 
  initialFilters = {} 
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const statusOptions = ["active", "paused", "ended"];
  const categoryOptions = ["ecommerce", "brand", "lead-gen", "awareness"];
  const platformOptions = ["google", "facebook", "instagram", "linkedin", "twitter"];

  const applyFilters = async (currentFilters: FilterState) => {
    setIsLoading(true);
    
    // Simulate API call delay for smooth loading experience
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...data];

    // Date range filter
    if (currentFilters.dateRange.start) {
      filtered = filtered.filter(row => 
        new Date(row.startDate) >= new Date(currentFilters.dateRange.start)
      );
    }
    if (currentFilters.dateRange.end) {
      filtered = filtered.filter(row => 
        new Date(row.endDate) <= new Date(currentFilters.dateRange.end)
      );
    }

    // Status filter
    if (currentFilters.status.length > 0) {
      filtered = filtered.filter(row => 
        currentFilters.status.includes(row.status)
      );
    }

    // Category filter
    if (currentFilters.category.length > 0) {
      filtered = filtered.filter(row => 
        currentFilters.category.includes(row.category)
      );
    }

    // Platform filter
    if (currentFilters.platform.length > 0) {
      filtered = filtered.filter(row => 
        currentFilters.platform.includes(row.platform)
      );
    }

    // ROI range filter
    filtered = filtered.filter(row => 
      row.roi >= currentFilters.roiRange.min && 
      row.roi <= currentFilters.roiRange.max
    );

    // Cost range filter
    filtered = filtered.filter(row => 
      row.cost >= currentFilters.costRange.min && 
      row.cost <= currentFilters.costRange.max
    );

    // Search term filter
    if (currentFilters.searchTerm) {
      const searchLower = currentFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(row => 
        row.campaign.toLowerCase().includes(searchLower)
      );
    }

    onFiltersChange(filtered);
    setIsLoading(false);
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    onFiltersChange(data);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.status.length > 0) count++;
    if (filters.category.length > 0) count++;
    if (filters.platform.length > 0) count++;
    if (filters.roiRange.min > 0 || filters.roiRange.max < 1000) count++;
    if (filters.costRange.min > 0 || filters.costRange.max < 50000) count++;
    if (filters.searchTerm) count++;
    return count;
  };

  const toggleArrayFilter = (
    filterKey: keyof Pick<FilterState, 'status' | 'category' | 'platform'>,
    value: string
  ) => {
    const currentArray = filters[filterKey] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilters({ [filterKey]: newArray });
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Loading skeleton component
  const FiltersSkeleton = () => (
    <div className="space-y-8 pb-6">
      {/* Search skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Date Range skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Status badges skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-18 rounded-full" />
        </div>
      </div>

      {/* Category badges skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-22 rounded-full" />
        </div>
      </div>

      {/* Platform badges skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-20" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-18 rounded-full" />
          <Skeleton className="h-8 w-22 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-18 rounded-full" />
        </div>
      </div>

      {/* ROI Range skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Cost Range skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-26" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-22" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-22" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 relative hover:bg-muted border-2 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          {isLoading ? "Applying..." : "Advanced Filters"}
          {activeFiltersCount > 0 && !isLoading && (
            <Badge 
              variant="secondary" 
              className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500 text-white animate-pulse"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SheetHeader className="border-b pb-4 mb-6">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="h-5 w-5 text-primary" />
            Advanced Filters
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {isLoading ? "Applying filters..." : "Apply multiple filters to refine your campaign data view"}
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <FiltersSkeleton />
        ) : (
          <div className="space-y-8 pb-6">
            {/* Search */}
            <div className="space-y-3">
              <Label htmlFor="search" className="text-sm font-medium text-foreground">
                Search Campaigns
              </Label>
              <Input
                id="search"
                placeholder="Search by campaign name..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                className="h-10"
                disabled={isLoading}
              />
            </div>

          {/* Date Range */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              Date Range
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...filters.dateRange, start: e.target.value }
                  })}
                  className="h-10 font-mono text-sm"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...filters.dateRange, end: e.target.value }
                  })}
                  className="h-10 font-mono text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Campaign Status</Label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Badge
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  className={`cursor-pointer capitalize px-3 py-1.5 text-sm font-medium transition-all hover:scale-105 ${
                    filters.status.includes(status) 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted border-2"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isLoading && toggleArrayFilter('status', status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Campaign Category</Label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <Badge
                  key={category}
                  variant={filters.category.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer capitalize px-3 py-1.5 text-sm font-medium transition-all hover:scale-105 ${
                    filters.category.includes(category) 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted border-2"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isLoading && toggleArrayFilter('category', category)}
                >
                  {category.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Platform Filter */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Platform</Label>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map((platform) => (
                <Badge
                  key={platform}
                  variant={filters.platform.includes(platform) ? "default" : "outline"}
                  className={`cursor-pointer capitalize px-3 py-1.5 text-sm font-medium transition-all hover:scale-105 ${
                    filters.platform.includes(platform) 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted border-2"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isLoading && toggleArrayFilter('platform', platform)}
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* ROI Range */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <TrendingUp className="h-4 w-4 text-green-500" />
              ROI Range (%)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roi-min" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Minimum ROI
                </Label>
                <Input
                  id="roi-min"
                  type="number"
                  min="0"
                  max="1000"
                  placeholder="0"
                  value={filters.roiRange.min}
                  onChange={(e) => updateFilters({
                    roiRange: { ...filters.roiRange, min: Number(e.target.value) }
                  })}
                  className="h-10"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roi-max" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Maximum ROI
                </Label>
                <Input
                  id="roi-max"
                  type="number"
                  min="0"
                  max="1000"
                  placeholder="1000"
                  value={filters.roiRange.max}
                  onChange={(e) => updateFilters({
                    roiRange: { ...filters.roiRange, max: Number(e.target.value) }
                  })}
                  className="h-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Cost Range */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <TrendingDown className="h-4 w-4 text-orange-500" />
              Cost Range ($)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost-min" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Minimum Cost
                </Label>
                <Input
                  id="cost-min"
                  type="number"
                  min="0"
                  max="50000"
                  placeholder="0"
                  value={filters.costRange.min}
                  onChange={(e) => updateFilters({
                    costRange: { ...filters.costRange, min: Number(e.target.value) }
                  })}
                  className="h-10"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-max" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Maximum Cost
                </Label>
                <Input
                  id="cost-max"
                  type="number"
                  min="0"
                  max="50000"
                  placeholder="50000"
                  value={filters.costRange.max}
                  onChange={(e) => updateFilters({
                    costRange: { ...filters.costRange, max: Number(e.target.value) }
                  })}
                  className="h-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Active Filters
                </Label>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {activeFiltersCount}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.status.map(status => (
                  <Badge key={status} variant="outline" className="text-xs border-blue-300 bg-white/50 hover:bg-red-50 transition-colors">
                    Status: {status}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600" 
                      onClick={() => toggleArrayFilter('status', status)}
                    />
                  </Badge>
                ))}
                {filters.category.map(category => (
                  <Badge key={category} variant="outline" className="text-xs border-blue-300 bg-white/50 hover:bg-red-50 transition-colors">
                    Category: {category}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600" 
                      onClick={() => toggleArrayFilter('category', category)}
                    />
                  </Badge>
                ))}
                {filters.platform.map(platform => (
                  <Badge key={platform} variant="outline" className="text-xs border-blue-300 bg-white/50 hover:bg-red-50 transition-colors">
                    Platform: {platform}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600" 
                      onClick={() => toggleArrayFilter('platform', platform)}
                    />
                  </Badge>
                ))}
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <Badge variant="outline" className="text-xs border-blue-300 bg-white/50">
                    Date Range: {filters.dateRange.start || 'Start'} - {filters.dateRange.end || 'End'}
                  </Badge>
                )}
              </div>
            </div>
          )}
          </div>
        )}

        <SheetFooter className="gap-3 pt-6 border-t bg-muted/30 -mx-6 -mb-6 px-6 py-4">
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="gap-2 flex-1 h-10"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
            Clear All
          </Button>
          <Button onClick={() => setIsOpen(false)} className="flex-1 h-10" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Applying...
              </>
            ) : (
              "Apply Filters"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
