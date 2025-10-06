import type { Metadata } from "next";
import Link from "next/link";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Data Automation Formulas & VBA - ExcelFormula.xyz",
  description:
    "Learn how to automate Excel tasks with powerful VBA macros and formulas. Import data, process files, generate reports, and more with real examples.",
  keywords: [
    "data automation",
    "excel automation",
    "VBA macros",
    "excel vba",
    "automated reports",
    "data processing",
    "excel scripting",
    "macro examples",
    "excel automation tools",
  ],
};

export default function DataAutomationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <div className="border-gray-200 border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link href="/">
            <Button size="sm" variant="ghost">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-bold text-4xl text-gray-900">
              Data Automation with Excel
            </h1>
            <p className="text-gray-600 text-lg">
              Automate repetitive tasks with VBA macros and advanced formulas.
              Save hours of manual work every week.
            </p>
          </div>

          {/* Auto Import CSV Files */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <span className="text-2xl">📂</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Auto-Import CSV Files
                </h2>
                <p className="mt-1 text-gray-600">
                  Automatically import and process CSV files from a folder
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">VBA Code:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="whitespace-pre text-green-400 text-sm">
                    {`Sub ImportAllCSV()
    Dim folderPath As String
    Dim fileName As String
    Dim ws As Worksheet
    
    folderPath = "C:\\Data\\"
    fileName = Dir(folderPath & "*.csv")
    
    Do While fileName <> ""
        Set ws = Sheets.Add
        ws.Name = Left(fileName, Len(fileName) - 4)
        
        With ws.QueryTables.Add( _
            Connection:="TEXT;" & folderPath & fileName, _
            Destination:=ws.Range("A1"))
            .TextFileParseType = xlDelimited
            .TextFileCommaDelimiter = True
            .Refresh BackgroundQuery:=False
        End With
        
        fileName = Dir()
    Loop
End Sub`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  What It Does:
                </h3>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Scans a folder for all CSV files</li>
                  <li>Creates a new sheet for each file</li>
                  <li>Imports data automatically with proper formatting</li>
                  <li>Handles multiple files in one click</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Auto-Generate Reports */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Auto-Generate Monthly Reports
                </h2>
                <p className="mt-1 text-gray-600">
                  Create formatted reports with charts and summaries
                  automatically
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">VBA Code:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="whitespace-pre text-green-400 text-sm">
                    {`Sub GenerateMonthlyReport()
    Dim reportWs As Worksheet
    Dim dataWs As Worksheet
    Dim lastRow As Long
    
    Set dataWs = Sheets("RawData")
    Set reportWs = Sheets.Add
    reportWs.Name = "Report_" & Format(Date, "mmm_yyyy")
    
    ' Add headers
    With reportWs
        .Range("A1").Value = "Monthly Sales Report"
        .Range("A1").Font.Size = 16
        .Range("A1").Font.Bold = True
        
        ' Calculate totals
        lastRow = dataWs.Cells(Rows.Count, 1).End(xlUp).Row
        .Range("A3").Value = "Total Sales:"
        .Range("B3").Formula = "=SUM(RawData!D2:D" & lastRow & ")"
        
        .Range("A4").Value = "Average Deal:"
        .Range("B4").Formula = "=AVERAGE(RawData!D2:D" & lastRow & ")"
        
        ' Format as currency
        .Range("B3:B4").NumberFormat = "$#,##0.00"
    End With
    
    MsgBox "Report generated successfully!"
End Sub`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  What It Does:
                </h3>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Creates a new report sheet with current month name</li>
                  <li>Calculates total sales and averages automatically</li>
                  <li>Applies professional formatting</li>
                  <li>Can be scheduled to run automatically</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Email Automation */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Auto-Send Email Reports
                </h2>
                <p className="mt-1 text-gray-600">
                  Automatically email reports to stakeholders with attachments
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">VBA Code:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="whitespace-pre text-green-400 text-sm">
                    {`Sub EmailReport()
    Dim OutApp As Object
    Dim OutMail As Object
    Dim filePath As String
    
    ' Save workbook
    ThisWorkbook.Save
    filePath = ThisWorkbook.FullName
    
    ' Create email
    Set OutApp = CreateObject("Outlook.Application")
    Set OutMail = OutApp.CreateItem(0)
    
    With OutMail
        .To = "manager@company.com"
        .CC = "team@company.com"
        .Subject = "Monthly Report - " & Format(Date, "mmmm yyyy")
        .Body = "Please find attached the monthly sales report." & vbCrLf & vbCrLf & _
                "Summary:" & vbCrLf & _
                "Total Sales: " & Format(Sheets("Report").Range("B3").Value, "$#,##0.00")
        .Attachments.Add filePath
        .Send ' Use .Display to review before sending
    End With
    
    Set OutMail = Nothing
    Set OutApp = Nothing
End Sub`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  What It Does:
                </h3>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Creates a professional email with report summary</li>
                  <li>Attaches the Excel file automatically</li>
                  <li>Sends to multiple recipients (To and CC)</li>
                  <li>
                    Can be triggered manually or scheduled with Windows Task
                    Scheduler
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advanced Formula Automation */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-orange-100 p-2">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Dynamic Data Processing
                </h2>
                <p className="mt-1 text-gray-600">
                  Process and transform data with advanced array formulas
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Formula:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {`=FILTER(Data, (Data[Status]="Active") * (Data[Revenue]>=10000))`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  What It Does:
                </h3>
                <p className="text-gray-600">
                  This dynamic array formula automatically filters your data to
                  show only active accounts with revenue of $10,000 or more. The
                  results update automatically when your source data changes -
                  no VBA needed! Perfect for creating live dashboards and
                  reports.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Need Custom Automation?
            </h2>
            <p className="mb-6 text-gray-600">
              Our AI can generate VBA macros and automation formulas tailored to
              your specific workflow.
            </p>
            <Link href="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Generate Custom Automation →
              </Button>
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
