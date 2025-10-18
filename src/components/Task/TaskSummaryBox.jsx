import { Alert, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function TaskSummaryBox({ generating, summary, typing, onTypingComplete }) {
    const [typedWords, setTypedWords] = useState(typing ? "" : summary?.text ?? "");

    const summaryWords = summary?.text ? summary.text.split(" ") : [];
    const summaryGeneratedDate = summary?.generated_at ?
        (new Date(summary.generated_at)).toLocaleString() : null;
    
    // llm typing effect
    useEffect(() => {
        if (!summary || !typing) return;

        setTypedWords("");
        let i = 0;
        const id = setInterval(() => {
            const nextWord = summaryWords[i];
            setTypedWords(prev => (prev ? prev + " " : "") + nextWord);
            i += 1;
            if (i >= summaryWords.length) {
                clearInterval(id);
                onTypingComplete();
            }
        }, 150);

        return () => {
            clearInterval(id);
            onTypingComplete();
        }
    }, [summary, typing]);
    
    if (!generating && !summary) return null;

    let innerComponent;
    if (generating) {
        innerComponent = (<Typography
            sx={{
                '::after': { content: '"."', animation: 'dots 1s steps(3, end) infinite' },
                '@keyframes dots': {
                    '0%, 20%': { content: '"."' },
                    '40%': { content: '".."' },
                    '60%, 100%': { content: '"..."' },
                }
            }}
        >
            Summarizing
        </Typography>);

    } else if (summary) {
        innerComponent = (<>
            <Typography variant='h4' component='h2'>AI Summary</Typography>
            {summary.was_prompt_truncated && <Alert severity='warning'>
                <b>Warning:</b> Some subtasks weren't included in the summary because this task was too big
            </Alert>}
            <Typography aria-live="polite">{typedWords}</Typography>
            <Typography variant="body2" color='textSecondary' suppressHydrationWarning>
                AI summaries may not be accurate. Generated {summaryGeneratedDate}
            </Typography>
        </>);
    }

    return <Paper sx={{ p: 1, my: 2, borderRadius: 1, }}>
        {innerComponent}
    </Paper>
}