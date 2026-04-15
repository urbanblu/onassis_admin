"use client";

import CustomInputComponent from "@/components/custom-input-component";
import CustomCheckboxItem from "@/components/custom-checkbox";
import FinancialsService from "@/api/financials";
import type { IReportDefinition } from "@/interfaces/financials.interface";
import ToastService from "@/utils/toast-service";
import {
  Button,
  Header,
  Label,
  ListBox,
  Select,
  Separator,
  Spinner,
} from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { RiDownloadLine } from "react-icons/ri";
import { AiOutlineExport } from "react-icons/ai";

const PAGE_SIZE = 10;

function ReportsView() {
  const { data: reports = [] } = useQuery({
    queryKey: ["financials", "reports"],
    queryFn: FinancialsService.fetchReports,
  });
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [optionalSelectedColumns, setOptionalSelectedColumns] = useState<
    Record<string, boolean>
  >({});
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [previewPage, setPreviewPage] = useState(1);
  const resolvedReportId = selectedReportId ?? reports[0]?.reportId ?? null;

  const selectedReport = useMemo(
    () => reports.find((r) => r.reportId === resolvedReportId) ?? null,
    [reports, resolvedReportId],
  );

  const executeMutation = useMutation({
    mutationKey: ["financials", "execute-report"],
    mutationFn: (payload: {
      reportId: number;
      filters: Record<string, string | number>;
    }) => FinancialsService.executeReport(payload.reportId, payload.filters),
  });

  const previewRows = useMemo(
    () => executeMutation.data?.data ?? [],
    [executeMutation.data?.data],
  );
  const visibleColumns = useMemo(() => {
    if (!selectedReport) return [];
    return selectedReport.schema.columns.filter(
      (col) => col.required || optionalSelectedColumns[col.key],
    );
  }, [optionalSelectedColumns, selectedReport]);
  const totalPreviewPages = Math.max(
    1,
    Math.ceil(previewRows.length / PAGE_SIZE),
  );
  const pagedRows = useMemo(() => {
    const start = (previewPage - 1) * PAGE_SIZE;
    return previewRows.slice(start, start + PAGE_SIZE);
  }, [previewRows, previewPage]);

  const groupedReports = useMemo(() => {
    const groups = new Map<string, IReportDefinition[]>();
    for (const report of reports) {
      const category = report.schema.category || "General";
      const current = groups.get(category) ?? [];
      current.push(report);
      groups.set(category, current);
    }
    return Array.from(groups.entries()).map(([key, values]) => ({
      key,
      values,
    }));
  }, [reports]);

  const onDownloadCsv = () => {
    if (!previewRows.length || !visibleColumns.length) return;

    const escape = (val: unknown) => {
      const str = String(val ?? "");
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    };

    const header = visibleColumns.map((c) => escape(c.label)).join(",");
    const rows = previewRows
      .map((row) => visibleColumns.map((c) => escape(row[c.key])).join(","))
      .join("\n");

    const blob = new Blob([`${header}\n${rows}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${executeMutation.data?.report_name ?? "report"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onGenerate = async () => {
    if (!selectedReport) return;

    const required = selectedReport.schema.filters.filter((f) => f.required);
    for (const req of required) {
      const val = filters[req.key]?.trim();
      if (!val) {
        ToastService.error({ text: `${req.label} is required.` });
        return;
      }
    }

    const payload: Record<string, string | number> = {};
    Object.entries(filters).forEach(([k, v]) => {
      const trimmed = v.trim();
      if (trimmed) payload[k] = trimmed;
    });

    try {
      const result = await executeMutation.mutateAsync({
        reportId: selectedReport.reportId,
        filters: payload,
      });
      setPreviewPage(1);
      if (!result.status) {
        ToastService.error({
          text: result.message || "Report execution failed",
        });
      }
    } catch (error) {
      ToastService.error({
        text:
          error instanceof Error ? error.message : "Report execution failed",
      });
    }
  };

  return (
    <div className="flex flex-col px-7 pb-3 pt-5 space-y-3 h-full overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col space-y-4 w-full h-full min-h-0">
          <span className="text-sm sm:text-lg font-gotham-black uppercase shrink-0">
            REPORTS
          </span>
          <div className="shrink-0">
            <ReportsSelection
              reports={groupedReports}
              onSelected={(val) => {
                setSelectedReportId(val.reportId);
                setOptionalSelectedColumns({});
                setFilters({});
                setPreviewPage(1);
              }}
              selectedValue={selectedReport}
            />
          </div>
          <div className="rounded-sm border-[1.5px] p-5 flex-1 flex flex-col min-h-0 bg-white">
            <span className="text-xs font-gotham-bold shrink-0 mb-4">
              {selectedReport?.schema.category ?? "General"}
            </span>
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar overscroll-contain">
              <div className="mb-5 shrink-0 space-y-3">
                {(selectedReport?.schema.filters ?? []).map((filter) => {
                  if (filter.type === "date") {
                    return (
                      <div key={filter.key} className="max-w-[220px]">
                        <Label className="text-xs">{filter.label}</Label>
                        <input
                          type="date"
                          value={filters[filter.key] ?? ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              [filter.key]: e.target.value,
                            }))
                          }
                          className="mt-2 w-full border rounded-sm border-gray-300 px-3 py-2 text-xs"
                        />
                      </div>
                    );
                  }

                  return (
                    <CustomInputComponent
                      key={filter.key}
                      className="max-w-[220px] p-0 border border-gray-400 rounded-sm"
                      label={filter.label}
                      placeholder={`Input ${filter.label}`}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [filter.key]: e.target.value,
                        }))
                      }
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                {(selectedReport?.schema.columns ?? []).map((column) => (
                  <CustomCheckboxItem
                    key={column.key}
                    selected={
                      column.required || optionalSelectedColumns[column.key]
                    }
                    label={column.label}
                    labelClassName="font-gotham-regular"
                    isDisabled={column.required}
                    setIsSelected={(checked) =>
                      setOptionalSelectedColumns((prev) => ({
                        ...prev,
                        [column.key]: Boolean(checked),
                      }))
                    }
                  />
                ))}
              </div>
            </div>

            <Button
              className="mt-5 w-full rounded-sm bg-[#f6a21f] text-white font-gotham-black text-xs py-6 shrink-0"
              isDisabled={!selectedReport || executeMutation.isPending}
              onClick={onGenerate}
              isPending={executeMutation.isPending}
            >
              {({ isPending }) => (
                <>
                  {isPending ? (
                    <>
                      <Spinner color="current" size="sm" />
                      {"GENERATE REPORT"}
                    </>
                  ) : (
                    "GENERATE REPORT"
                  )}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="w-full h-full min-h-0 rounded-sm bg-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-gray-200 shrink-0 flex justify-between items-center">
            <span className="text-xs font-gotham-bold text-black">Preview</span>
            <div className="space-x-2">
              <Button
                className="rounded-sm bg-[#f6a21f] text-white"
                size="md"
                isDisabled={!previewRows.length}
                onClick={onDownloadCsv}
              >
                <AiOutlineExport className="w-3.5 h-3.5" />
                <span className="text-xs font-gotham-bold">Export Data</span>
              </Button>
            </div>
          </div>
          <Separator className="text-black bg-[#f6a21f]/30" />
          <div className="bg-white m-5 p-5 h-full min-h-0 flex flex-col">
            {!executeMutation.data ? (
              <div className="text-sm font-gotham-black">
                Generate a report to preview data
              </div>
            ) : (
              <>
                <div className="text-sm font-gotham-bold mb-3">
                  {executeMutation.data.report_name}
                  <span className="font-gotham-regular text-xs">{` /${previewRows.length.toLocaleString("en-GH")} records`}</span>
                </div>
                <div className="flex-1 min-h-0 overflow-auto border rounded-sm">
                  <table className="min-w-max w-full text-xs">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-black">
                        {visibleColumns.map((col) => (
                          <th
                            key={col.key}
                            className="text-left px-3 py-2 whitespace-nowrap"
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagedRows.length === 0 ? (
                        <tr>
                          <td
                            className="px-3 py-4 text-center"
                            colSpan={visibleColumns.length || 1}
                          >
                            No rows returned
                          </td>
                        </tr>
                      ) : (
                        pagedRows.map((row, idx) => (
                          <tr key={idx} className="border-b">
                            {visibleColumns.map((col) => (
                              <td
                                key={col.key}
                                className="px-3 py-2 whitespace-nowrap"
                              >
                                {String(row[col.key] ?? "")}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pt-3 flex items-center justify-between text-xs">
                  <span>
                    Page {previewPage} of {totalPreviewPages}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="border rounded-sm"
                      isDisabled={previewPage <= 1}
                      onClick={() => setPreviewPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="border rounded-sm"
                      isDisabled={previewPage >= totalPreviewPages}
                      onClick={() =>
                        setPreviewPage((p) =>
                          Math.min(totalPreviewPages, p + 1),
                        )
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsView;

type Props = {
  reports: Array<{ key: string; values: IReportDefinition[] }>;
  onSelected: (value: IReportDefinition) => void;
  selectedValue: IReportDefinition | null;
};

const ReportsSelection = ({ reports, onSelected, selectedValue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = selectedValue?.name ?? "";

  // When you select an item, close the select and then call onSelected
  function handleAction(payload: IReportDefinition) {
    setIsOpen(false);
    onSelected(payload);
  }

  return (
    <Select
      className=""
      placeholder="Select a Report"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Label className="text-xs font-gotham-bold text-gray-500">
        Select a Report
      </Label>
      <Select.Trigger
        className="border border-gray-200 shadow-none rounded-sm bg-white hover:border-gray-400 transition-colors w-full"
        onClick={() => setIsOpen(true)}
      >
        <Select.Value className="text-xs">
          {selectedLabel || "Select a Report"}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="rounded-sm">
        <ListBox>
          {reports.map((section, sIndex) => (
            <ListBox.Section key={section.key}>
              <Header className="px-4 py-2 text-[10px] font-gotham-medium text-gray-400 uppercase tracking-wider">
                {section.key}
              </Header>
              {section.values.map((report) => (
                <ListBox.Item
                  key={report.reportId}
                  id={report.name.toLowerCase().replace(/\s+/g, "-")}
                  textValue={report.name}
                  onAction={() => handleAction(report)}
                  className="flex items-center px-4 py-2 text-xs rounded-sm cursor-pointer hover:bg-gray-200/50 outline-none transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="flex-1 truncate group-selected:font-gotham-medium">
                      {report.name}
                    </span>
                  </div>
                </ListBox.Item>
              ))}
              {sIndex < reports.length - 1 && (
                <div className="h-px bg-gray-500/30 my-1 mx-2" />
              )}
            </ListBox.Section>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
