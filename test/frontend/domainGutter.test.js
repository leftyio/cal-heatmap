import { select } from 'd3-selection';

/**
 * @jest-environment jsdom
 */

import CalHeatmap from '../../src/CalHeatmap';

describe('on horizontal scroll', () => {
  let cal = null;
  beforeEach(() => {
    cal = new CalHeatmap();
    select('body').append('div').attr('id', 'cal-heatmap');
  });

  afterEach(() => {
    cal.destroy();
    cal = null;
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  [0, 50].forEach((gutter) => {
    describe(`on domain gutter = ${gutter}`, () => {
      it('renders the given domain gutter', () => {
        const baseWidth = 120;

        cal.init({
          range: 2,
          domain: { type: 'year', gutter },
          subDomain: { type: 'month', gutter: 0, width: 10 },
          formatter: { domainLabel: null },
        });
        expect(
          select('#cal-heatmap').select('.graph-domain:nth-child(1)').attr('x'),
        ).toBe('0');
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1)')
            .attr('width'),
        ).toBe(`${baseWidth}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1) .domain-background')
            .attr('width'),
        ).toBe(`${baseWidth}`);

        expect(
          select('#cal-heatmap').select('.graph-domain:nth-child(2)').attr('x'),
        ).toBe(`${baseWidth + gutter}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2)')
            .attr('width'),
        ).toBe(`${baseWidth}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2) .domain-background')
            .attr('width'),
        ).toBe(`${baseWidth}`);
      });

      it('does not affect the domain height', () => {
        const baseHeight = 10;

        cal.init({
          range: 2,
          domain: { type: 'year', gutter },
          subDomain: { type: 'month', gutter: 0, width: 10 },
          formatter: {
            domainLabel: null,
          },
        });
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1)')
            .attr('height'),
        ).toBe(`${baseHeight}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2)')
            .attr('height'),
        ).toBe(`${baseHeight}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1) .domain-background')
            .attr('height'),
        ).toBe(`${baseHeight}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2) .domain-background')
            .attr('height'),
        ).toBe(`${baseHeight}`);
      });
    });
  });
});

describe('on vertical scroll', () => {
  let cal = null;
  beforeEach(() => {
    cal = new CalHeatmap();
    select('body').append('div').attr('id', 'cal-heatmap');
  });

  afterEach(() => {
    cal.destroy();
    cal = null;
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  [0, 10].forEach((gutter) => {
    describe(`on domain gutter = ${gutter}`, () => {
      afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = '';
      });

      it('renders the given domain gutter', () => {
        const baseHeight = 10;

        cal.init({
          range: 2,
          verticalOrientation: true,
          domain: { type: 'year', gutter },
          subDomain: { type: 'month', gutter: 0, width: 10 },
          formatter: { domainLabel: null },
        });
        expect(
          select('#cal-heatmap').select('.graph-domain:nth-child(1)').attr('y'),
        ).toBe('0');
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1) .domain-background')
            .attr('height'),
        ).toBe(`${baseHeight}`);
        expect(
          select('#cal-heatmap').select('.graph-domain:nth-child(2)').attr('y'),
        ).toBe(`${baseHeight + gutter}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2) .domain-background')
            .attr('height'),
        ).toBe(`${baseHeight}`);
      });

      it('does not affect the domain width', () => {
        const baseWidth = 120;

        cal.init({
          range: 2,
          verticalOrientation: true,
          domain: { type: 'year', gutter },
          subDomain: { type: 'month', gutter: 0, width: 10 },
          formatter: {
            domainLabel: null,
          },
        });
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1)')
            .attr('width'),
        ).toBe(`${baseWidth}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(1) .domain-background')
            .attr('width'),
        ).toBe(`${baseWidth}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2)')
            .attr('width'),
        ).toBe(`${baseWidth}`);
        expect(
          select('#cal-heatmap')
            .select('.graph-domain:nth-child(2) .domain-background')
            .attr('width'),
        ).toBe(`${baseWidth}`);
      });
    });
  });
});
