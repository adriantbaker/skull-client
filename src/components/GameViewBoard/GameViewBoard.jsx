import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Europe from '../../images/europe.svg';

const GameViewBoard = () => {
    const d3Container = useRef(null);

    useEffect(
        () => {
            if (d3Container.current) {
                const svg = d3.select(d3Container.current);

                d3.xml(Europe)
                    .then((data) => {
                        svg
                            .node()
                            .append(data.documentElement);
                    });

                svg
                    .append('text')
                    .attr('x', 40)
                    .attr('y', 40)
                    .style('font-size', 24)
                    .text('hello');
            }
        },
        [d3Container.current],
    );

    return (
        <svg
            width={400}
            height={200}
            ref={d3Container}
        />
    );
};

export default GameViewBoard;
