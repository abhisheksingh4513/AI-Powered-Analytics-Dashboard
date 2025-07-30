"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronUp, 
  ChevronDown, 
  Filter
} from "lucide-react";
import { TableRow as TableRowType } from "@/lib/data";
import { SimpleExportButton } from "@/components/simple-export-button";
import { AdvancedFilters } from "@/components/advanced-filters";

interface DataTableProps {
  data: TableRowType[];
}

type SortField = keyof TableRowType;
type SortDirection = "asc" | "desc";

export function DataTable({ data }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>("campaign");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<TableRowType[]>(data);
  const itemsPerPage = 5;

  // Apply status filter to the already filtered data from advanced filters
  const statusFilteredData = filteredData.filter((item) => 
    statusFilter === "all" || item.status === statusFilter
  );

  const sortedData = [...statusFilteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      paused: "secondary", 
      ended: "destructive",
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value}%`;

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 p-2 hover:bg-muted"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === "asc" ? (
          <ChevronUp className="ml-1 h-3 w-3" />
        ) : (
          <ChevronDown className="ml-1 h-3 w-3" />
        )
      )}
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Campaign Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <AdvancedFilters 
              data={data} 
              onFiltersChange={setFilteredData}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <SimpleExportButton data={statusFilteredData} filename="campaign-performance" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <SortButton field="campaign">Campaign</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="status">Status</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="category">Category</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="platform">Platform</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="startDate">Start Date</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="impressions">Impressions</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="clicks">Clicks</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="ctr">CTR</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="cost">Cost</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="conversions">Conversions</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="roi">ROI</SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{row.campaign}</TableCell>
                  <TableCell>{getStatusBadge(row.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {row.category.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {row.platform}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(row.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.impressions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercentage(row.ctr)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(row.cost)}
                  </TableCell>
                  <TableCell className="text-right">{row.conversions}</TableCell>
                  <TableCell className="text-right text-green-600 font-semibold">
                    {formatPercentage(row.roi)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
