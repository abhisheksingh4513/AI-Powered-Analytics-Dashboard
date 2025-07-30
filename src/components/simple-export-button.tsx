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

interface SimpleExportButtonProps {
  data: TableRow[];
  filename?: string;
}

export function SimpleExportButton({ data, filename = "campaigns" }: SimpleExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      console.log("Exporting CSV for data:", data);
      
      const headers = ["Campaign", "Status", "Category", "Platform", "Start Date", "End Date", "Impressions", "Clicks", "CTR", "Cost", "Conversions", "ROI"];
      const csvContent = [
        headers.join(","),
        ...data.map(row => [
          `"${row.campaign}"`,
          row.status,
          row.category,
          row.platform,
          row.startDate,
          row.endDate,
          row.impressions,
          row.clicks,
          `${row.ctr}%`,
          `$${row.cost}`,
          row.conversions,
          `${row.roi}%`
        ].join(","))
      ].join("\n");

      const fileName = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
      downloadFile(csvContent, fileName, "text/csv;charset=utf-8;");
      
      alert("✅ CSV file downloaded successfully!");
      console.log("CSV export completed");
      
    } catch (error) {
      console.error("CSV Export failed:", error);
      alert("❌ CSV export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const exportToHTML = () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      console.log("Exporting HTML for data:", data);
      
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>ADmyBRAND Insights - Campaign Report</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            background: #f8f9fa;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { 
            color: #3b82f6; 
            margin-bottom: 5px;
            font-size: 28px;
        }
        h2 { 
            color: #6b7280; 
            margin-bottom: 20px;
            font-size: 18px;
        }
        .meta {
            color: #6b7280;
            margin-bottom: 30px;
            font-size: 14px;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            font-size: 14px;
        }
        th, td { 
            border: 1px solid #e5e7eb; 
            padding: 12px; 
            text-align: left; 
        }
        th { 
            background-color: #3b82f6; 
            color: white;
            font-weight: bold; 
        }
        tr:nth-child(even) {
            background-color: #f9fafb;
        }
        .status-active { color: #059669; font-weight: bold; }
        .status-paused { color: #d97706; font-weight: bold; }
        .status-ended { color: #dc2626; font-weight: bold; }
        .roi-high { color: #059669; font-weight: bold; }
        .roi-low { color: #dc2626; }
        .summary { 
            margin-top: 40px; 
            padding: 20px; 
            background-color: #f3f4f6; 
            border-radius: 8px; 
            border-left: 4px solid #3b82f6;
        }
        .summary h3 {
            margin-top: 0;
            color: #1f2937;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .stat-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        .stat-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .stat-value {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-top: 5px;
        }
        @media print {
            body { margin: 0; background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ADmyBRAND Insights</h1>
        <h2>Campaign Performance Report</h2>
        <div class="meta">
            <strong>Generated on:</strong> ${new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Campaign</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Platform</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>CTR</th>
                    <th>Cost</th>
                    <th>Conversions</th>
                    <th>ROI</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(row => `
                    <tr>
                        <td><strong>${row.campaign}</strong></td>
                        <td><span class="status-${row.status}">${row.status.toUpperCase()}</span></td>
                        <td><span class="capitalize">${row.category.replace('-', ' ').toUpperCase()}</span></td>
                        <td><span class="capitalize">${row.platform.toUpperCase()}</span></td>
                        <td>${new Date(row.startDate).toLocaleDateString()}</td>
                        <td>${new Date(row.endDate).toLocaleDateString()}</td>
                        <td>${row.impressions.toLocaleString()}</td>
                        <td>${row.clicks.toLocaleString()}</td>
                        <td>${row.ctr}%</td>
                        <td>$${row.cost.toLocaleString()}</td>
                        <td>${row.conversions}</td>
                        <td><span class="${row.roi > 250 ? 'roi-high' : row.roi < 200 ? 'roi-low' : ''}">${row.roi}%</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="summary">
            <h3>📊 Summary Statistics</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-label">Total Campaigns</div>
                    <div class="stat-value">${data.length}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Total Impressions</div>
                    <div class="stat-value">${data.reduce((sum, row) => sum + row.impressions, 0).toLocaleString()}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Total Clicks</div>
                    <div class="stat-value">${data.reduce((sum, row) => sum + row.clicks, 0).toLocaleString()}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Total Cost</div>
                    <div class="stat-value">$${data.reduce((sum, row) => sum + row.cost, 0).toLocaleString()}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Total Conversions</div>
                    <div class="stat-value">${data.reduce((sum, row) => sum + row.conversions, 0)}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Average ROI</div>
                    <div class="stat-value">${(data.reduce((sum, row) => sum + row.roi, 0) / data.length).toFixed(1)}%</div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>💡 <strong>To save as PDF:</strong> Press Ctrl+P (or Cmd+P on Mac) → Choose "Save as PDF" → Click Save</p>
        </div>
    </div>
</body>
</html>`;

      const fileName = `${filename}_report_${new Date().toISOString().split('T')[0]}.html`;
      downloadFile(htmlContent, fileName, "text/html;charset=utf-8;");
      
      alert("✅ HTML report downloaded! Open it and press Ctrl+P to save as PDF.");
      console.log("HTML export completed");
      
    } catch (error) {
      console.error("HTML Export failed:", error);
      alert("❌ HTML export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
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
        <DropdownMenuItem onClick={exportToCSV} className="gap-2" disabled={isExporting}>
          <FileSpreadsheet className="h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToHTML} className="gap-2" disabled={isExporting}>
          <FileText className="h-4 w-4" />
          Export as HTML Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
