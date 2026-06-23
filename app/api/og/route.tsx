import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #08101c 0%, #0a1a2e 50%, #08101c 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            fontSize: 28,
            color: '#22d3ee',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Full Stack · AI · Products
        </div>
        <div
          style={{
            fontSize: 96,
            color: '#ffffff',
            fontWeight: 800,
            lineHeight: 0.95,
            textAlign: 'center',
          }}
        >
          IMRAN AL
        </div>
        <div
          style={{
            fontSize: 96,
            background: 'linear-gradient(90deg, #22d3ee, #0ea5e9)',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 800,
            lineHeight: 0.95,
          }}
        >
          FARABI
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            marginTop: 32,
          }}
        >
          I build digital products that solve real problems.
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
