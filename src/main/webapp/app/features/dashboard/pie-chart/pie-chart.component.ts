import { Component, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';
import 'easy-pie-chart/dist/jquery.easypiechart.js';

import { PieChartService } from './pie-chart.service';

@Component({
    selector: 'jhi-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
// TODO: move easypiechart to component
export class PieChart implements AfterViewInit {

    public charts: Array<Object>;
    private _init = false;

    constructor(private _pieChartService: PieChartService) {
        this.charts = this._pieChartService.getData();
    }

    ngAfterViewInit() {
        if (!this._init) {
            this._loadPieCharts();
            this._updatePieCharts();
            this._init = true;
        }
    }

    private _loadPieCharts() {

        jQuery('.chart').each(() => {
            const chart = jQuery(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep(from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: jQuery(this).attr('data-rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        });
    }

    private _updatePieCharts() {
        const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

        jQuery('.pie-charts .chart').each((index, chart) => {
            jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
        });
    }
}