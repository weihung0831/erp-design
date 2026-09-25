@props([
    'label',
    'value',
    'detailPrefix',
    'detailHighlight',
    'detailHighlightTone' => 'green',
    'icon' => 'revenue',
    'tone' => 'green',
    'trend' => null,
    'tag' => null,
])

@php
    $iconClass = match ($tone) {
        'orange' => 'bg-[#fff4e7] text-[#d89443]',
        'blue' => 'bg-[#edf1ff] text-[#7188d3]',
        'red' => 'bg-[#fff0ee] text-[#e47e6b]',
        default => 'bg-[#eaf8f0] text-[#43ae79]',
    };

    $highlightClass = $detailHighlightTone === 'orange' ? 'text-[#c88942]' : ($detailHighlightTone === 'blue' ? 'text-[#4c9bd6]' : 'text-[#46ae7b]');
@endphp

<article {{ $attributes->merge(['class' => 'metric-card group']) }}>
    <div class="flex items-start justify-between gap-3">
        <div class="metric-icon {{ $iconClass }}">
            @if ($icon === 'revenue')
                <svg class="size-[19px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18V9.5M12 18V5M18 18v-5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m6 7 6-2 6 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            @elseif ($icon === 'invoice')
                <svg class="size-[19px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 9h8M8 13h3M16 13h.01M8 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            @elseif ($icon === 'inventory')
                <svg class="size-[19px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3.5 8 4.25v8.5l-8 4.25-8-4.25v-8.5L12 3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m4.5 7.75 7.5 4 7.5-4M12 11.75v8.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
            @else
                <svg class="size-[19px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 5h11A1.5 1.5 0 0 1 19 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5v-11A1.5 1.5 0 0 1 6.5 5Z" stroke="currentColor" stroke-width="1.7"/><path d="M8 9h8M8 13h5M8 16h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            @endif
        </div>

        @if ($trend)
            <span class="metric-trend metric-trend-up"><svg class="size-3" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m2.5 8.5 3-3 2 2 3-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 3.5h3v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>{{ $trend }}</span>
        @elseif ($tag)
            <span class="metric-tag {{ $tone === 'red' ? 'bg-[#fff3f1] text-[#da7969]' : 'bg-[#fff7ed] text-[#c88942]' }}">{{ $tag }}</span>
        @endif
    </div>
    <p class="mt-5 text-xs font-medium text-[#7e8a9e]">{{ $label }}</p>
    <p class="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-[#19253a]">{{ $value }}</p>
    <p class="mt-2 text-[11px] text-[#9ba5b4]">{{ $detailPrefix }} <span class="font-semibold {{ $highlightClass }}">{{ $detailHighlight }}</span></p>
</article>
