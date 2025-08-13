export default function sanitizeCpf(cpf: string): string {
  return cpf.replace(/[.\-]/g, '');
}
