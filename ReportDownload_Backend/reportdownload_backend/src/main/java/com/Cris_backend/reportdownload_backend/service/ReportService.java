package com.Cris_backend.reportdownload_backend.service;

import com.Cris_backend.reportdownload_backend.model.Report;
import com.Cris_backend.reportdownload_backend.repository.ReportRepository;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

@Service
public class ReportService {
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public byte[] createPdf(String reportName, String date, String location) throws IOException, DocumentException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);
        document.open();

        Optional<Report> reportOpt = reportRepository.findByReportNameAndDateAndLocation(reportName, date, location);
        if (reportOpt.isPresent()) {
            Report report = reportOpt.get();
            document.add(new Paragraph("Report Name: " + report.getReportName()));
            document.add(new Paragraph("Date: " + report.getDate()));
            document.add(new Paragraph("Location: " + report.getLocation()));
            document.add(new Paragraph("\nData:\n" + report.getContent()));
        } else {
            document.add(new Paragraph("No report found for the given parameters."));
        }

        document.close();
        return byteArrayOutputStream.toByteArray();
    }
}
