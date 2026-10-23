import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-8 sm:py-10 bg-slate-900 text-slate-400">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm">© Copyright 2026. All Rights Reserved by MegaBlog.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-slate-500">Company</h3>
                            <ul>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Features</Link></li>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Pricing</Link></li>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Affiliate Program</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-slate-500">Support</h3>
                            <ul>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Account</Link></li>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Help</Link></li>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-slate-500">Legals</h3>
                            <ul>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Terms & Conditions</Link></li>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Privacy Policy</Link></li>
                                <li className="mb-2"><Link className="text-sm font-medium text-slate-400 hover:text-slate-200" to="/">Licensing</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer