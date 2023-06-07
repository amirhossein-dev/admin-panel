import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'fiscal-year',
    templateUrl: './fiscal-year.component.html',
    styleUrls: ['./fiscal-year.component.scss']
})
export class FiscalYearComponent implements OnInit {
    mockArray!: any[]
    addSection: boolean = false;
    mockData = [
        {
            "id": 127,
            "fromDate": "2022-03-21T00:00",
            "toDate": "2023-03-20T00:00",
            "title": "1401",
            "latestTemporalNo": 189,
            "latestFinalNo": 1,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 128,
            "fromDate": "2023-03-21T00:00",
            "toDate": "2024-03-20T00:00",
            "title": "1402",
            "latestTemporalNo": 32,
            "latestFinalNo": 1,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 129,
            "fromDate": "2024-03-21T01:00",
            "toDate": "2025-03-20T00:00",
            "title": "1403",
            "latestTemporalNo": 15,
            "latestFinalNo": 1,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 130,
            "fromDate": "2025-03-21T00:00",
            "toDate": "2026-03-20T00:00",
            "title": "1404",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 131,
            "fromDate": "2026-03-21T00:00",
            "toDate": "2027-03-20T00:00",
            "title": "1405",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 135,
            "fromDate": "2027-03-21T00:00",
            "toDate": "2028-03-20T00:00",
            "title": "1406",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 136,
            "fromDate": "2028-03-21T01:00",
            "toDate": "2029-03-20T00:00",
            "title": "1407",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 139,
            "fromDate": "2029-03-21T01:00",
            "toDate": "2050-03-20T00:00",
            "title": "1440",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": true
        },
        {
            "id": 140,
            "fromDate": "2050-03-21T00:00",
            "toDate": "2066-04-25T20:30",
            "title": "1440",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 141,
            "fromDate": "2066-04-26T20:30",
            "toDate": "2023-03-20T00:00",
            "title": "1410",
            "latestTemporalNo": 1,
            "latestFinalNo": 1,
            "latestDailySerialNo": 1,
            "active": true
        },
        {
            "id": 142,
            "fromDate": "2023-03-21T00:00",
            "toDate": "2031-12-09T20:30",
            "title": "1405",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 1137,
            "fromDate": "2031-12-10T20:30",
            "toDate": "2023-01-24T20:30",
            "title": "تست",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 1138,
            "fromDate": "2023-01-25T20:30",
            "toDate": "2023-01-24T20:30",
            "title": "70",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        },
        {
            "id": 1139,
            "fromDate": "2023-01-25T20:30",
            "toDate": "2023-01-24T20:30",
            "title": "70",
            "latestTemporalNo": 0,
            "latestFinalNo": 0,
            "latestDailySerialNo": 0,
            "active": false
        }
    ]
    constructor() { }
    showAddSection() {
        this.addSection = true
    }
    hideAddSection() {
        this.addSection = false
    }

    ngOnInit(): void {
        this.mockDatapopulator()
    }

    mockDatapopulator() {
        this.mockArray = this.mockData
    }

}
