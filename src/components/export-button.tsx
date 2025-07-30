"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableRow } from "@/lib/data";
import { showToast } from "@/components/toast";

interface ExportButtonProps {
  data: TableRow[];
  filename?: string;
}

export function ExportButton({ data, filename = "campaigns" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      console.log("Starting CSV export...", data);
      
      const headers = [
        "Campaign",
        "Status", 
        "Impressions",
        "Clicks",
        "CTR (%)",
        "Cost ($)",
        "Conversions",
        "ROI (%)"
      ];
      
      const csvRows = [
        headers.join(","),
        ...data.map(row => [
          `"${row.campaign.replace(/"/g, '""')}"`, // Escape quotes in campaign names
          row.status,
          row.impressions,
          row.clicks,
          row.ctr,
          row.cost,
          row.conversions,
          row.roi
        ].join(","))
      ];

      const csvContent = csvRows.join("\n");
      const BOM = "\uFEFF"; // Add BOM for Excel compatibility
      
      console.log("CSV Content created, length:", csvContent.length);
      
      const blob = new Blob([BOM + csvContent], { 
        type: "text/csv;charset=utf-8;" 
      });
      
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      console.log("Blob URL created:", url);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      
      console.log("Triggering download...");
      link.click();
      
      document.body.removeChild(link);
      
      // Clean up immediately to prevent memory leaks
      setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log("Blob URL cleaned up");
      }, 100);
      
      // Show success feedback
      showToast("success", `CSV exported successfully!`);
      console.log("CSV export completed");
      
    } catch (error) {
      console.error("CSV Export failed:", error);
      showToast("error", "CSV export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      console.log("Starting PDF export...");
      
      // Create a simple HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>ADmyBRAND Insights - Campaign Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #3b82f6; margin-bottom: 10px; }
            h2 { color: #6b7280; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
            .status-active { color: #059669; }
            .status-paused { color: #d97706; }
            .status-ended { color: #dc2626; }
            .roi-high { color: #059669; font-weight: bold; }
            .roi-low { color: #dc2626; }
            .summary { margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h1>ADmyBRAND Insights</h1>
          <h2>Campaign Performance Report</h2>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Status</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>CTR (%)</th>
                <th>Cost ($)</th>
                <th>Conversions</th>
                <th>ROI (%)</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  <td>${row.campaign}</td>
                  <td class="status-${row.status}">${row.status}</td>
                  <td>${row.impressions.toLocaleString()}</td>
                  <td>${row.clicks.toLocaleString()}</td>
                  <td>${row.ctr}%</td>
                  <td>$${row.cost.toLocaleString()}</td>
                  <td>${row.conversions}</td>
                  <td class="${row.roi > 250 ? 'roi-high' : row.roi < 200 ? 'roi-low' : ''}">${row.roi}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="summary">
            <h3>Summary Statistics</h3>
            <p><strong>Total Campaigns:</strong> ${data.length}</p>
            <p><strong>Total Impressions:</strong> ${data.reduce((sum, row) => sum + row.impressions, 0).toLocaleString()}</p>
            <p><strong>Total Clicks:</strong> ${data.reduce((sum, row) => sum + row.clicks, 0).toLocaleString()}</p>
            <p><strong>Total Cost:</strong> $${data.reduce((sum, row) => sum + row.cost, 0).toLocaleString()}</p>
            <p><strong>Total Conversions:</strong> ${data.reduce((sum, row) => sum + row.conversions, 0)}</p>
            <p><strong>Average ROI:</strong> ${(data.reduce((sum, row) => sum + row.roi, 0) / data.length).toFixed(1)}%</p>
          </div>
        </body>
        </html>
      `;
      
      // Create blob and download as HTML (which can be printed to PDF)
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      console.log("HTML Blob URL created:", url);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_report_${new Date().toISOString().split('T')[0]}.html`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      
      console.log("Triggering HTML download...");
      link.click();
      
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log("HTML Blob URL cleaned up");
      }, 100);
      
      // Show success feedback with instructions
      showToast("success", `Report downloaded! Open the HTML file and print to PDF.`);
      console.log("PDF export completed");
      
    } catch (error) {
      console.error("PDF Export failed:", error);
      showToast("error", "PDF export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCSVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("CSV export clicked");
    exportToCSV();
  };

  const handlePDFClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("PDF export clicked");
    exportToPDF();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCSVClick} className="gap-2" disabled={isExporting}>
          <FileSpreadsheet className="h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePDFClick} className="gap-2" disabled={isExporting}>
          <FileText className="h-4 w-4" />
          Export as HTML Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
