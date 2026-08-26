import './index.css';
// =============================================================================
// MIT License
// Copyright (c) 2026 Aparavi Software AG
// =============================================================================

/**
 * AppDescriptor — the one module this app exposes to the RocketRide shell.
 * The shell lazy-loads it on activation and renders `app` raw; the app
 * declares its layout inside with <AppLayout>.
 */

// HMR anchor: keeps the shared jsx runtime referenced even when the app's
// root component fails to compile — an error build otherwise orphans it, the
// hot runtime tombstones its factory, and every later fix-apply dies
// silently (the frozen-preview bug).
import 'react/jsx-dev-runtime';

import type { AppDescriptor } from 'shell';
import App from './App';

const descriptor: AppDescriptor = {
	id: 'sushmita_dev.defendr',
	name: 'Defendr',
	branding: { appName: 'Defendr' },
	app: App,
};

export default descriptor;
