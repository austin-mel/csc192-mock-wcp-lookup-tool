import { Component } from "vue";

import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon, YouTubeIcon } from "@/assets";


interface SocialMediaLink
{
    icon: Component;

    href: string;

    name: string;
}


export const links: SocialMediaLink[] = [
    {
        icon: InstagramIcon,
        href: "https://example.com/portfolio/instagram",
        name: "Instagram demo link"
    },
    {
        icon: TwitterIcon,
        href: "https://example.com/portfolio/x",
        name: "X demo link"
    },
    {
        icon: LinkedInIcon,
        href: "https://example.com/portfolio/linkedin",
        name: "LinkedIn demo link"
    },
    {
        icon: YouTubeIcon,
        href: "https://example.com/portfolio/youtube",
        name: "YouTube demo link"
    },
    {
        icon: FacebookIcon,
        href: "https://example.com/portfolio/facebook",
        name: "Facebook demo link"
    },
];
